import React, { useEffect, useReducer, useState } from "react";
import { db } from "@/utils/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import * as turf from "@turf/turf";
import path from "@/assets/json/path.json";
import { getDatabase, ref, get, child } from "firebase/database";
import { useAuth } from "@/context/AuthContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "change-visibility": {
      return {
        ...state,
        [action.target]: {
          ...state[action.target],
          [action.name]: !state[action.target][action.name],
        },
      };
    }

    case "go-back": {
      return {
        ...state,
        selectedBuilding: null,
        selectedData: null,
        routeFG1: null,
        routeFG2: null,
        routeFG3: null,
      };
    }

    case "select-building": {
      return {
        ...state,
        selectedBuilding: action.building,
        selectedData: action.data,
      };
    }

    case "calculated-path-update": {
      return {
        ...state,
        routeFG1: {
          type: "Feature",
          geometry: {
            type: "MultiLineString",
            coordinates: [action.data[0].paths],
          },
        },
        routeFG2: {
          type: "Feature",
          geometry: {
            type: "MultiLineString",
            coordinates: [action.data[1].paths],
          },
        },
        routeFG3: {
          type: "Feature",
          geometry: {
            type: "MultiLineString",
            coordinates: [action.data[2].paths],
          },
        },
        distances: [
          {
            bike: action.data[0].bike,
            distance: action.data[0].distance,
            walk: action.data[0].walk,
          },
          {
            bike: action.data[1].bike,
            distance: action.data[1].distance,
            walk: action.data[1].walk,
          },
          {
            bike: action.data[2].bike,
            distance: action.data[2].distance,
            walk: action.data[2].walk,
          },
        ],
      };
    }
  }
};

class MinPriorityQueue {
  constructor() {
    this.queue = [];
  }

  insert(element, priority) {
    this.queue.push({ element, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  remove() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const useMapHook = () => {
  const { setAuthLoading } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    routeFG1: null,
    routeFG2: null,
    routeFG3: null,
    distances: null,
    data: null,
    path: null,
    gate_one: [12.3981503, 121.9829883],
    gate_two: [12.39640848, 121.98238727],
    gate_three: [12.3953124, 121.9830642],
    startLoc: null,
    endLoc: null,
    details: null,
    selectedBuilding: null,
    selectedData: null,
    show: { building: true, boundary: true, path: true },
  });

  const [buildingJson, setBuildingJson] = useState(null);

  const handleSwitchChange = (name) => {
    dispatch({ type: "change-visibility", target: "show", name: name });
  };

  const handleGoBack = () => {
    dispatch({ type: "go-back" });
  };

  const convertCoords = (coords) => {
    return [coords[1], coords[0]];
  };

  const createGraph = (pathData) => {
    const graph = {};

    pathData.features.forEach((feature) => {
      if (feature.geometry.type === "MultiLineString") {
        feature.geometry.coordinates.forEach((lineString) => {
          for (let i = 0; i < lineString.length - 1; i++) {
            const [start, end] = [lineString[i], lineString[i + 1]].map(
              (coord) => coord.join(",")
            );
            const distance = turf.distance(
              turf.point(lineString[i]),
              turf.point(lineString[i + 1])
            );

            if (!graph[start]) graph[start] = {};
            if (!graph[end]) graph[end] = {};

            graph[start][end] = distance;
            graph[end][start] = distance;
          }
        });
      }
    });

    return graph;
  };

  // Calculate distance between two coordinates
  const calculateDistance = (coord1, coord2) => {
    const [x1, y1] = coord1.split(",").map(Number);
    const [x2, y2] = coord2.split(",").map(Number);
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  // Find the closest node to a given point
  const findClosestNode = (graph, point) => {
    let closestNode = null;
    let minDistance = Infinity;

    Object.keys(graph).forEach((node) => {
      const distance = calculateDistance(node, point);
      if (distance < minDistance) {
        minDistance = distance;
        closestNode = node;
      }
    });

    return closestNode;
  };

  // Dijkstra's algorithm to find the shortest path
  const dijkstra = (graph, startPoint, endPoint) => {
    const startNode = findClosestNode(graph, startPoint);
    const endNode = findClosestNode(graph, endPoint);

    if (!startNode || !endNode) {
      console.log("Start or end node not found in the graph.");
      return [];
    }

    const distances = {};
    const prevNodes = {};
    const priorityQueue = new MinPriorityQueue();

    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      prevNodes[node] = null;
    });
    distances[startNode] = 0;

    priorityQueue.insert(startNode, 0);

    while (!priorityQueue.isEmpty()) {
      const { element: currentNode } = priorityQueue.remove();

      if (currentNode === endNode) {
        const path_arr = [];
        let node = endNode;
        let totalDistance = 0;

        while (node) {
          path_arr.unshift(node.split(",").map(Number));

          if (prevNodes[node]) {
            const edge = graph[prevNodes[node]][node];
            if (edge) {
              totalDistance += edge;
            }
          }

          node = prevNodes[node];
        }

        let walk = totalDistance * 15;
        let ride = totalDistance * 7;

        const results = {
          paths: path_arr,
          distance: totalDistance,
          walk: Math.ceil(walk),
          bike: Math.ceil(ride),
        };

        return results;
      }

      Object.keys(graph[currentNode]).forEach((neighbor) => {
        const distance = graph[currentNode][neighbor];
        const altDistance = distances[currentNode] + distance;

        if (altDistance < distances[neighbor]) {
          distances[neighbor] = altDistance;
          prevNodes[neighbor] = currentNode;
          priorityQueue.insert(neighbor, altDistance);
        }
      });
    }

    console.log("No path found.");
    return [];
  };

  // Calculate route and update state
  const calculateRoute = (buildingCoords) => {
    const graph = createGraph(path);
    const g1 = convertCoords(state.gate_one).join(",");
    const g2 = convertCoords(state.gate_two).join(",");
    const g3 = convertCoords(state.gate_three).join(",");
    const endNode = convertCoords(buildingCoords).join(",");

    const pcg1 = dijkstra(graph, g1, endNode);
    const pcg2 = dijkstra(graph, g2, endNode);
    const pcg3 = dijkstra(graph, g3, endNode);

    dispatch({ type: "calculated-path-update", data: [pcg1, pcg2, pcg3] });
  };

  const handleBuildingClick = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(feature.properties.name);
      layer.on("click", async () => {
        // Make the click handler async
        const data_id = String(feature.properties.id);

        try {
          const docRef = doc(db, "buildings_data", data_id); // Fetching document by ID (hardcoded as '1' for now)

          // Await the getDoc call to fetch the document
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Log the document data if it exists
            dispatch({
              type: "select-building",
              data: { ...docSnap.data(), id: docSnap.id },
              building: convertCoords(feature.geometry.coordinates),
            });
          } else {
            dispatch({
              type: "select-building",
              data: null,
              building: convertCoords(feature.geometry.coordinates),
            });
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        }

        calculateRoute(convertCoords(feature.geometry.coordinates));
      });
    }
  };

  useEffect(() => {
    setAuthLoading(true);

    const fetchData = async () => {
      const dbRef = ref(getDatabase());

      try {
        // Reference the path where data is stored
        const snapshot = await get(child(dbRef, `json_files/building`));

        if (snapshot.exists()) {
          setBuildingJson({ ...snapshot.val() });
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setAuthLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  return {
    state,
    dispatch,
    handleBuildingClick,
    handleSwitchChange,
    handleGoBack,
    buildingJson,
  };
};

export default useMapHook;
