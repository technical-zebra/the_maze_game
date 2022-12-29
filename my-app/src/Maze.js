export function createMazeArray(row, col) {
    const start = [1, 0];
    const end = [2 * row - 1, 2 * col];
    const mazeDataArray = [];

    function randomNum(k) {
        return Math.floor(Math.random() * k);
    };

    // 生成 2R+1 行 2R+1 列数组
    for (let i = 0; i < 2 * col + 1; i++) {
      let arr = [];
      for (let j = 0; j < 2 * row + 1; j++) {
        // 设置墙和初始格子
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
    // 随机选择一点作为 currentNode
    let currentNode = mazeDataArray[2 * randomNum(row) + 1][2 * randomNum(col) + 1];
    currentNode.isVisited = true;
    // 访问过的节点列表
    let visitedList = [];
    visitedList.push(currentNode);
    // 循环以下操作，直到所有的格子都被访问到。
    while (currentNode.isVisited) {
      // 得到当前访问格子的四周（上下左右）的格子
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
      // 在这些格子中随机选择一个没有在访问列表中的格子，
      // 如果找到，则把该格子和当前访问的格子中间的墙打通(置为0)，
      if (neighborArray.length !== 0) { // 如果找到
        let neighborNode = neighborArray[randomNum(neighborArray.length)];
        mazeDataArray[(neighborNode.j + currentNode.j) / 2][(neighborNode.i + currentNode.i) / 2].value = 1;
        neighborNode.isVisited = true;
        visitedList.push(neighborNode);
        currentNode = neighborNode;
      } else {
        // 把该格子作为当前访问的格子，并放入访问列表。
        // 如果周围所有的格子都已经访问过，则从已访问的列表中，随机选取一个作为当前访问的格子。
        currentNode = visitedList[randomNum(visitedList.length)];
        if (!currentNode) {
          // visitedList为空时 跳出循环
          break;
        }
        currentNode.isVisited = true;
        // 从 visitedList 中删除随机出来的当前节点
        let tempArr = [];
        visitedList.forEach(item => {
          if (item !== currentNode) {
            tempArr.push(item);
          }
        });
        visitedList = tempArr;
      }
    }
    //start 0,0
    // 1,0 => 0
    mazeDataArray[start[0]][start[1]] = {
      i: start[0],
      j: start[1],
      value: 1
    };
    // end 9,9
    // 20,21 =>1
    mazeDataArray[end[0]][end[1]] = {
      i: end[0],
      j: end[1],
      value: 1
    };


    return [mazeDataArray, start, end];

  };

  export function roundNum(num) {
    num=Math.floor(num);
    return num
  };
