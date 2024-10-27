import { db } from "@/utils/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import * as turf from "@turf/turf";
import path from "@/assets/json/path.json";

const useMapHook = () => {
  const [buildingJson, setBuildingJson] = useState(null);
  const [temporaryHolder, setTemporaryHolder] = useState(null);
  const [travelMode, setTravelMode] = useState(false);

  const retriggerCalculateRoute = () => {
    calculateRoute(temporaryHolder);
  };

  const handleTravelModeChange = () => {
    setTravelMode((prev) => !prev);
  };

  useEffect(() => {
    if (temporaryHolder) {
      calculateRoute(temporaryHolder);
    }
  }, [travelMode, temporaryHolder]);

  const createGraph = (pathData, isWalk) => {
    const graph = {};

    pathData.features.forEach((feature) => {
      if (feature.geometry.type === "MultiLineString") {
        const { isOneWay, notFrom } = feature.properties; // Extract properties
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

            // Store edge properties for forward direction
            graph[start][end] = {
              distance,
              isOneWay,
              allowedDirection: start,
              id: feature.properties.id, // Store id here for forward edge
            };

            // console.log(isWalk, travelMode);

            // Allow reverse direction only if the path is not one-way OR if isWalk is true
            if (
              !isWalk ||
              (!isOneWay &&
                (!notFrom || !notFrom.includes(feature.properties.id)))
            ) {
              graph[end][start] = {
                distance,
                isOneWay: false,
                allowedDirection: end,
                id: feature.properties.id, // Store id here for reverse edge as well
              };
            }
          }
        });
      }
    });

    return graph;
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
    const edgeIdsTraversed = []; // Array to hold all edge IDs traversed

    // Initialize distances and previous nodes
    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      prevNodes[node] = null;
    });
    distances[startNode] = 0;

    priorityQueue.insert(startNode, 0);

    while (!priorityQueue.isEmpty()) {
      const { element: currentNode } = priorityQueue.remove();

      // Iterate over each neighbor of the current node
      Object.keys(graph[currentNode]).forEach((neighbor) => {
        const edge = graph[currentNode][neighbor];
        const distance = edge.distance;
        const isOneWay = edge.isOneWay;
        const allowedDirection = edge.allowedDirection;

        // Log the ID of the edge being traversed
        if (edge.id) {
          edgeIdsTraversed.push(edge.id); // Store the ID of the edge
        }

        // Check if the edge can be traversed from the current node
        if (!isOneWay || (isOneWay && allowedDirection === currentNode)) {
          const altDistance = distances[currentNode] + distance;

          // Update the shortest distance and previous node if necessary
          if (altDistance < distances[neighbor]) {
            distances[neighbor] = altDistance;
            prevNodes[neighbor] = currentNode;
            priorityQueue.insert(neighbor, altDistance);
          }
        }
      });

      // Stop processing if we've reached the end node
      if (currentNode === endNode) {
        const path_arr = [];
        let node = endNode;
        let totalDistance = 0;

        while (node) {
          path_arr.unshift(node.split(",").map(Number));

          if (prevNodes[node]) {
            const edge = graph[prevNodes[node]][node];
            if (edge) {
              totalDistance += edge.distance;
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
          edgeIdsTraversed: edgeIdsTraversed, // Include all edge IDs traversed
        };

        return results;
      }
    }

    console.log("No path found.");
    return [];
  };

  // Calculate route and update state
  const calculateRoute = (buildingCoords) => {
    const graph = createGraph(path, travelMode);
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
    layer.bindPopup(feature.properties.name);
    if (feature.properties) {
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

        setTemporaryHolder(convertCoords(feature.geometry.coordinates));
      });
    }
  };

  return {
    handleBuildingClick,
    buildingJson,
    setBuildingJson,
    travelMode,
    handleTravelModeChange,
  };
};

export default useMapHook;
