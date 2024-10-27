<!-- Changes about the code -->
<!-- 1. createGraph function. Search mo lang tol sa html yung createGraph na function tapos replace mo nito -->

```javascript
// createGraph function starts here -->
const createGraph = (pathData, isWalk) => {
  const graph = {};

  pathData.features.forEach((feature) => {
    if (feature.geometry.type === "MultiLineString") {
      const { isOneWay, notFrom } = feature.properties; // Extract properties
      feature.geometry.coordinates.forEach((lineString) => {
        for (let i = 0; i < lineString.length - 1; i++) {
          const [start, end] = [lineString[i], lineString[i + 1]].map((coord) =>
            coord.join(",")
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

          console.log(isWalk);

          // Allow reverse direction only if the path is not one-way OR if isWalk is true
          if (
            isWalk ||
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
// ends here -->
```

<!-- 2. dijkstra algorithm adjustment. Search mo lang tol sa html yung dijkstra na function tapos replace mo nito -->

```javascript
// dijkstra algorithm starts here -->
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
// ends here -->
```

### Instructions on how to integrate

1. Need mo latest copy nung path.json tol.
2. Sa createGraph function, may nadagdag na isWalk na variable. Boolean s'ya, if true, lilift ko restrictions sa path then if naka false ay isasama sa flow yung restrictions.
3. Ang diskarte ko sana sa mobile app ay diba may toggle ka, each toggle ay may value. Kunware, kapag walk ay dapat true ang isWalk, else false.
4. Kada toggle ay similar behavior sa pag click ng building, may lalabas na path, ang pinagkaiba lang ngayon ay madadagdagan ng isWalk, which is boolean, na variable.
