class Board {

    constructor() {

        this.adjList = new Map();
        this.coordinates = this.populateCoordinates();

    }

    addVertex(v) {
        this.adjList.set(v, []);
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
    }

    populateCoordinates() {
        let counter = 0;
        let obj = {};

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                obj[counter] = [i, j];
                counter++;
            }
        }

        return obj;
    }

    getCoordinates(n) {
        return this.coordinates[n];
    }

    getCoordinatesKey(i, j) {
        for (const key in this.coordinates) {
            const val = this.coordinates[key];
            const vi = val[0];
            const vj = val[1];
            if (i === vi && j === vj) {
                return key;
            }
        }
    }

}

function possible(arr) {

    const i = arr[0];
    const j = arr[1];

    if (i >= 0 && i < 8 && j >= 0 && j < 8) {
        const calc = [];
        const poss = [];

        const p1 = [i + 2, j + 1];
        const p2 = [i + 2, j - 1];
        const p3 = [i + 1, j + 2];
        const p4 = [i + 1, j - 2];
        const p5 = [i - 2, j + 1];
        const p6 = [i - 2, j - 1];
        const p7 = [i - 1, j + 2];
        const p8 = [i - 1, j - 2];

        calc.push(p1);
        calc.push(p2);
        calc.push(p3);
        calc.push(p4);
        calc.push(p5);
        calc.push(p6);
        calc.push(p7);
        calc.push(p8);

        for (let p = 0; p < calc.length; p++) {
            if (calc[p][0] >= 0 && calc[p][0] < 8
                && calc[p][1] >= 0 && calc[p][1] < 8) {
                poss.push(calc[p]);
            }
        }

        return poss;
    } else {
        return null;
    }

}

const b = new Board();

for (let p = 0; p < 64; p++) {
    b.addVertex(p);
}
for (let p = 0; p < 64; p++) {
    const coordinates = b.getCoordinates(p);
    const poss = possible(coordinates);
    for (let q = 0; q < poss.length; q++) {
        const qi = poss[q][0];
        const qj = poss[q][1];
        const key = b.getCoordinatesKey(qi, qj);
        b.addEdge(p, parseInt(key));
    }
}

function search(graph, start, end) {

    const queue = [];
    const visited = new Array(64);

    for (let i = 0; i < visited.length; i++) {
        visited[i] = false;
    }

    const key = graph.getCoordinatesKey(start[0], start[1]);
    visited[key] = true;
    queue.push(key);

    let save = 0;
    let togo = 1;
    let moves = 0;

    while (queue.length > 0) {

        // Take value off the queue
        const front = parseInt(queue.shift());
        togo--;

        if(front === parseInt(graph.getCoordinatesKey(end[0], end[1]))){
            return moves;
        }

        // Add children to the queue
        graph.adjList.get(front).forEach((adjacent, i) => {
            if (!visited[adjacent]) {
                visited[adjacent] = true;
                queue.push(adjacent);
            }
        });

        if (togo === 0) {
            moves++;
            save = queue.length;
            togo = save;
        }
    }

    return null;
}

const allSquares = [];

for(let i = 0; i<8; i++){
    for(let j = 0; j<8; j++){
        allSquares.push(search(b, [0,0], [i,j]));
    }
}

console.log(allSquares);
