export function createMazeArray(row, col) {
    const start = [1, 0];
    const end = [2 * row - 1, 2 * col];
    const mazeDataArray = [];

    function randomNum(k) {
        return Math.floor(Math.random() * k);
    };

    for (let i = 0; i < 2 * col + 1; i++) {
      let arr = [];
      for (let j = 0; j < 2 * row + 1; j++) {
        if (i % 2 === 0 || j % 2 === 0) {
          arr.push({
            value: 0,
            i: i,
            j: j
          });
        } else {
          arr.push({
            value: 1,
            isVisited: false,
            i: i,
            j: j
          });
        }
      }
      mazeDataArray[i] = arr;
    }
    let currentNode = mazeDataArray[2 * randomNum(row) + 1][2 * randomNum(col) + 1];
    currentNode.isVisited = true;
    let visitedList = [];
    visitedList.push(currentNode);
    while (currentNode.isVisited) {
      let upNode = mazeDataArray[currentNode.i - 2] ? mazeDataArray[currentNode.i - 2][currentNode.j] : { isVisited: true };
      let rightNode = mazeDataArray[currentNode.j + 2] ? mazeDataArray[currentNode.i][currentNode.j + 2] : { isVisited: true };
      let downNode = mazeDataArray[currentNode.i + 2] ? mazeDataArray[currentNode.i + 2][currentNode.j] : { isVisited: true };
      let leftNode = mazeDataArray[currentNode.j - 2] ? mazeDataArray[currentNode.i][currentNode.j - 2] : { isVisited: true };
  
      let neighborArray = [];
      if (!upNode.isVisited) {
        neighborArray.push(upNode);
      }
      if (!rightNode.isVisited) {
        neighborArray.push(rightNode);
      }
      if (!downNode.isVisited) {
        neighborArray.push(downNode);
      }
      if (!leftNode.isVisited) {
        neighborArray.push(leftNode);
      }
      if (neighborArray.length !== 0) { 
        let neighborNode = neighborArray[randomNum(neighborArray.length)];
        mazeDataArray[(neighborNode.j + currentNode.j) / 2][(neighborNode.i + currentNode.i) / 2].value = 1;
        neighborNode.isVisited = true;
        visitedList.push(neighborNode);
        currentNode = neighborNode;
      } else {
        currentNode = visitedList[randomNum(visitedList.length)];
        if (!currentNode) {
          break;
        }
        currentNode.isVisited = true;
        let tempArr = [];
        visitedList.forEach(item => {
          if (item !== currentNode) {
            tempArr.push(item);
          }
        });
        visitedList = tempArr;
      }
    }
    mazeDataArray[start[0]][start[1]] = {
      i: start[0],
      j: start[1],
      value: 1
    };
    mazeDataArray[end[0]][end[1]] = {
      i: end[0],
      j: end[1],
      value: 1
    };


    return mazeDataArray;

  };

  export function roundNum(num) {
    num=Math.floor(num);
    return num
  };
