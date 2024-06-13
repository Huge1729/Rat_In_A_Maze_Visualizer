// import React from "react";

// import Maze from "./components/Maze";
// import InputForm from "./components/InputForm";
// import Legend from "./components/Legend";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function App() {
//   const [speed, setSpeed] = React.useState(200);
//   const [mazeSize, updateMazeSize] = React.useState(5);
//   const [maze, updateMaze] = React.useState([
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//   ]);

//   const isSafe = function (maze, n, x, y) {
//     if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] === 0) return true;
//     return false;
//   };

//   const ratInAMaze = async function (maze, n, x, y) {
//     if (x === n - 1 && y === n - 1) {
//       maze[x][y] = 2;
//       return true;
//     }

//     await delay(speed);
//     updateMaze((maze) => maze.slice());

//     if (isSafe(maze, n, x, y)) {
//       maze[x][y] = 2;

//       if (await ratInAMaze(maze, n, x + 1, y)) return true;
//       if (await ratInAMaze(maze, n, x, y + 1)) return true;
//       if (await ratInAMaze(maze, n, x - 1, y)) return true;
//       if (await ratInAMaze(maze, n, x, y - 1)) return true;

//       maze[x][y] = 0;
//       return false;
//     }

//     return false;
//   };

//   const startVis = async function () {
//     await ratInAMaze(maze, mazeSize, 0, 0);

//     await delay(300);
//     updateMaze((curr) => {
//       const updatedMaze = curr.slice();

//       // change the color from blue to green
//       for (let i = 0; i < updatedMaze.length; i++) {
//         for (let j = 0; j < updatedMaze[i].length; j++) {
//           if (updatedMaze[i][j] === 2) updatedMaze[i][j] = 3;
//         }
//       }

//       // change the start and end into yellow
//       updatedMaze[0][0] = 4;
//       updatedMaze[mazeSize - 1][mazeSize - 1] = 4;

//       return updatedMaze;
//     });
//   };

//   return (
//     <div className="main">
//       <header>
//         <h1>Rat in a Maze - Visualization</h1>
//         <p>Click the boxes to add barriers</p>
//       </header>
//       <InputForm
//         updateMazeSize={updateMazeSize}
//         updateMaze={updateMaze}
//         startVis={startVis}
//         setSpeed={setSpeed}
//       />
//       <Maze mazeSize={mazeSize} maze={maze} updateMaze={updateMaze} />
//       <Legend />
//     </div>
//   );
// }

import React, { useState } from "react";
import Maze from "./components/Maze";
import InputForm from "./components/InputForm";
import Legend from "./components/Legend";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [speed, setSpeed] = useState(200);
  const [mazeSize, updateMazeSize] = useState(5);
  const [maze, updateMaze] = useState(
    Array(mazeSize)
      .fill()
      .map(() => Array(mazeSize).fill(0))
  );

  const directions = [
    { dx: 1, dy: 0 }, // move right
    { dx: 0, dy: 1 }, // move down
    { dx: -1, dy: 0 }, // move left
    { dx: 0, dy: -1 }, // move up
  ];

  const isSafe = (maze, n, x, y) =>
    x >= 0 && y >= 0 && x < n && y < n && maze[x][y] === 0;

  const bfs = async () => {
    const queue = [{ x: 0, y: 0, path: [[0, 0]] }];
    const visited = Array(mazeSize)
      .fill()
      .map(() => Array(mazeSize).fill(false));
    visited[0][0] = true;

    while (queue.length > 0) {
      const { x, y, path } = queue.shift();

      for (const { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX === mazeSize - 1 && newY === mazeSize - 1) {
          updateMaze((prev) => {
            const newMaze = prev.map((row) => [...row]);
            path.forEach(([px, py]) => {
              newMaze[px][py] = 3; // Marking the shortest path
            });
            newMaze[newX][newY] = 2; // Marking the destination
            return newMaze;
          });

          await delay(speed);
          return true;
        }

        if (isSafe(maze, mazeSize, newX, newY) && !visited[newX][newY]) {
          visited[newX][newY] = true;
          queue.push({ x: newX, y: newY, path: [...path, [newX, newY]] });
        }
      }

      updateMaze((prev) => {
        const newMaze = prev.map((row) => [...row]);
        newMaze[x][y] = 2; // Marking visited cells
        return newMaze;
      });

      await delay(speed);
    }

    return false;
  };

  const startVis = async () => {
    await bfs();
    await delay(300);

    updateMaze((prev) => {
      const newMaze = prev.map((row) =>
        row.map((cell) => (cell === 2 ? 2 : cell))
      ); // Marking start and end points
      newMaze[0][0] = 4;
      newMaze[mazeSize - 1][mazeSize - 1] = 4;
      return newMaze;
    });
  };

  return (
    <div className="main">
      <header>
        <h1>Rat in a Maze - Visualization</h1>
        <p>Click the boxes to add barriers</p>
      </header>
      <InputForm
        updateMazeSize={(size) => {
          updateMazeSize(size);
          updateMaze(
            Array(size)
              .fill()
              .map(() => Array(size).fill(0))
          );
        }}
        updateMaze={updateMaze}
        startVis={startVis}
        setSpeed={setSpeed}
      />
      <Maze mazeSize={mazeSize} maze={maze} updateMaze={updateMaze} />
      <Legend />
    </div>
  );
}
