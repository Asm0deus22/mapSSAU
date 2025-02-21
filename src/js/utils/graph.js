// нужно ДО: PriorityQueue.js

class Node {
    constructor(id) {
        this.id = id;
        this.edges = [];
    }

    addNeighbor(node, weight) {
        this.edges.push({ node, weight });
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(id) {
        if (!this.nodes.has(id)) {
            this.nodes.set(id, new Node(id));
        }
        return this.nodes.get(id);
    }

    getNode(id) {
        return this.nodes.get(id) || null;
    }

    addEdge(id1, id2, weight) {
        const node1 = this.addNode(id1);
        const node2 = this.addNode(id2);
        node1.addNeighbor(node2, weight);
        node2.addNeighbor(node1, weight);
    }

    serialize() {
        const nodes = Array.from(this.nodes.keys());
        const edges = [];
        const addedEdges = new Set();

        for (const node of this.nodes.values()) {
            for (const edge of node.edges) {
                const neighbor = edge.node;
                let [id1, id2] = [node.id, neighbor.id];
                if (id1 > id2) [id1, id2] = [id2, id1];
                const edgeKey = `${id1}-${id2}-${edge.weight}`;
                if (!addedEdges.has(edgeKey)) {
                    edges.push([id1, id2, edge.weight]);
                    addedEdges.add(edgeKey);
                }
            }
        }

        return JSON.stringify({ nodes, edges });
    }

    static deserialize(dataStr) {
        const data = JSON.parse(dataStr);
        const graph = new Graph();
        data.nodes.forEach(id => graph.addNode(id));
        data.edges.forEach(([id1, id2, weight]) => {
            graph.addEdge(id1, id2, weight);
        });
        return graph;
    }

    djikstra(startId) {
        if (!this.nodes.has(startId)) {
            throw new Error('Start node not found');
        }

        const steps = new Map();
        const pq = new PriorityQueue();

        for (const nodeId of this.nodes.keys()) {
            steps[nodeId] = { distance: Infinity, next: null };
        }
        steps[startId].distance = 0;
        pq.enqueue(startId, 0);

        while (!pq.isEmpty()) {
            const { element: currentId, priority: currentDist } = pq.dequeue();

            if (currentDist > steps[currentId].distance) continue;

            const currentNode = this.nodes.get(currentId);
            for (const edge of currentNode.edges) {
                const neighbor = edge.node;
                const neighborId = neighbor.id;
                const newDist = currentDist + edge.weight;

                if (newDist < steps[neighborId].distance) {
                    steps[neighborId].distance = newDist;
                    steps[neighborId].next = currentNode.id;
                    pq.enqueue(neighborId, newDist);
                }
            }
        }

        return steps;
    }
}
