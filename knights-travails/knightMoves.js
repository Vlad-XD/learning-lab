// hash map with all possible knight moves
/*    moves in a chess board are represented by an array [x, y], representing a
      pair of coordinates on an 8x8 chess board described by a graph where the x 
      and y axes range from 0 to 7.
*/
const knightMoveMap = (function () {
  const map = new Map();

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      // stringifying our array key because we want it to be content-based instead of a reference to an array object in memory
      const key = JSON.stringify([x, y]);

      const possibleMoves = [
        [x - 2, y - 1],
        [x - 1, y - 2],
        [x + 2, y - 1],
        [x + 1, y - 2],
        [x - 2, y + 1],
        [x - 1, y + 2],
        [x + 2, y + 1],
        [x + 1, y + 2],
      ];

      const actualMoves = [];
      for (const move of possibleMoves) {
        // all valid knight moves should be within the boundaries of our chess board
        if (move[0] >= 0 && move[1] >= 0 && move[0] < 8 && move[1] < 8) {
          actualMoves.push(move);
        }
      }

      map.set(key, actualMoves);
    }
  }

  return map;
})();

/* utilizing a breadth-first search alogrithm to determine shortest number of 
   moves required by a knight piece to move from a first position to a
   second position
*/
function knightMoves(firstPos, secondPos) {
  const queue = [firstPos];
  const visited = new Map(); // keeps track of if a position was reached
  const prevPos = new Map(); // keeps track of from which position a current position was reached

  // loop until a path is found.
  // while(true) condition is valid because a knight can touch every position on the board, i.e, there will always be a path
  const secondPosKey = JSON.stringify(secondPos);
  while (true) {
    const currentPos = queue.shift();
    const key = JSON.stringify(currentPos);
    visited.set(key, true); // mark position as visited

    // check if second position has been reached
    if (key === secondPosKey) {
      // again, need to use stringify because I want to compare content
      break;
    }

    // fetch next moves from that position from the hash map
    const nextMoves = knightMoveMap.get(key);

    // add the next moves to the queue
    for (const move of nextMoves) {
      // check if a position has not been visited before adding to the queue
      const moveKey = JSON.stringify(move);
      if (!visited.has(moveKey)) {
        queue.push(move);
        prevPos.set(moveKey, currentPos); // keep track of how the next move was reached
      }
    }
  }

  // loop thorugh prevPos array to build the shortest path
  let shortestPath = [];
  let currentPos = secondPos;
  while (currentPos != firstPos) {
    shortestPath.push(currentPos);
    const key = JSON.stringify(currentPos);
    currentPos = prevPos.get(key);
  }
  shortestPath.push(firstPos);

  // reverse the array since we added positions starting from the second position
  shortestPath = shortestPath.reverse();

  return shortestPath;
}

// prints the solution for two moves
function printKnightMoves(firstPos, secondPos) {
  const path = knightMoves(firstPos, secondPos);
  const moves = path.length - 1;

  console.log(
    `To reach ${JSON.stringify(secondPos)} from ${JSON.stringify(firstPos)}, ${moves} ${moves === 1 ? "move is" : "moves are"} required! Here is your path:`,
  );
  for (const pos of path) {
    console.log(JSON.stringify(pos));
  }
}

export { knightMoves, printKnightMoves };
