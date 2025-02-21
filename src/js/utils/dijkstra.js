// Алгоритм Дейкстры поиска на графе
const dijkstra = (adjacencyMatrix, startVertex, finalVertex) => {
    const nVertices = adjacencyMatrix[0].length;

    // shortestDistances[i] будет содержать кратчайшее расстояние от startVertex до i
    const shortestDistances = new Array(nVertices).fill(Number.MAX_SAFE_INTEGER);

    // добавленное[i] будет истинным, если вершина i включена в дерево кратчайшего пути
    // или кратчайшее расстояние от startVertex до i окончательно определено
    const added = new Array(nVertices).fill(false);

    // Инициализируем все расстояния как бесконечные и добавляем [] как ложное
    for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
        shortestDistances[vertexIndex] = Number.MAX_SAFE_INTEGER;
        added[vertexIndex] = false;
    }

    // Расстояние исходной вершины от самой себя всегда равно 0
    shortestDistances[startVertex] = 0;

    // Родительский массив для хранения дерева кратчайших путей
    const parents = new Array(nVertices).fill(NO_PARENT);

    // Начальная вершина не имеет родителя
    parents[startVertex] = NO_PARENT;

    // Найти кратчайший путь для всех вершин
    for (let i = 1; i < nVertices; i++) {
        // Выберите вершину минимального расстояния из набора еще не обработанных вершин.
        // nearestVertex всегда равен startVertex в первой итерации.
        let nearestVertex = -1;
        let shortestDistance = Number.MAX_SAFE_INTEGER;

        for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
            if (!added[vertexIndex] && shortestDistances[vertexIndex] < shortestDistance) {
                nearestVertex = vertexIndex;
                shortestDistance = shortestDistances[vertexIndex];
            }
        }

        // Отметить выбранную вершину как обработанную
        added[nearestVertex] = true;
        
        // Обновить значение расстояния соседних вершин выбранной вершины.
        for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
            const edgeDistance = adjacencyMatrix[nearestVertex][vertexIndex];

            if (edgeDistance > 0 && shortestDistance + edgeDistance < shortestDistances[vertexIndex]) {
                parents[vertexIndex] = nearestVertex;
                shortestDistances[vertexIndex] = shortestDistance + edgeDistance;
            }
        }
    }

    // Выдать обработанный маршрут
    return getSolution(startVertex, shortestDistances, parents, finalVertex);
}

// получить маршрут
const getSolution = (startVertex, distances, parents, finalVertex) => {
    const nVertices = distances.length;

    let path = [];
    for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
        if (vertexIndex !== startVertex) {
            if (startVertex == startVertex && vertexIndex == finalVertex) {
                generatePath(vertexIndex, parents, path);
            }
        }
    }

    return path;
}

// сгенерировать маршрут
const generatePath = (currentVertex, parents, path) => {
    if (currentVertex === NO_PARENT) {
        return;
    }

    generatePath(parents[currentVertex], parents, path);
    path.push(mapping[currentVertex]);
}


// показательный код
let from = Math.floor(Math.random() * 8);
let to = Math.floor(Math.random() * 8);
while (from == to) {
    to = Math.floor(Math.random() * 8);
}
var fromToRoad = dijkstra(adjacencyMatrix, reverseMapping[mapping[from]], reverseMapping[mapping[to]]);
