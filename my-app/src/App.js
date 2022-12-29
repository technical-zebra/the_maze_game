import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import './App.css';
import { createMazeArray,roundNum } from './Maze.js';

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#383e5e'
    }
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor(e){
    this.setState({
      color: {e}
    });

  }
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={20}
        height={20}
        fill={this.state.color}
        shadowOffsetY={10}
        shadowColor={this.state.color}
        shadowOpacity={0.8}
        strokeEnabled={false}
      />
    );
  }
}

class Road extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#a86563'
    }

  }
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={20}
        height={20}
        fill={this.state.color}
        strokeEnabled={false}
      />
    );
  }
}

function DrawMaze() {

  const blocks = [];
  let [mazeDataArray,start,end] = createMazeArray(15, 15);
  for (let i = 0, len = mazeDataArray.length; i < len; i++) {
    // new row
    let row_x = 1
    let row_y = i * 20 + 1

    for (let j = 0, len = mazeDataArray[i].length; j < len; j++) {
      // start
      if (i == start[0] && j == start[1]) {

      }
      // end
      if (i == end[0] && j == end[1]) {

      }
      // road
      if (mazeDataArray[i][j].value) {
        blocks.push(<Road x={row_x + (j * 20)} y={row_y} />);
      }

    }
  }
  for (let i = 0, len = mazeDataArray.length; i < len; i++) {
    // new row
    let row_x = 1
    let row_y = i * 20 + 1

    for (let j = 0, len = mazeDataArray[i].length; j < len; j++) {
      // start
      if (i == start[0] && j == start[1]) {

      }
      // end
      if (i == end[0] && j == end[1]) {

      }
      // wall
      if (!mazeDataArray[i][j].value) {
        blocks.push(<Wall x={row_x + (j * 20)} y={row_y} />);
      }

    }
  }
  return blocks;
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: 0,
      screenHeight: 0
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      screenWidth: window.innerWidth / 1.5,
      screenHeight: window.innerHeight - 50
   };
  }

  render() {
    
    return (
      <div className='app-container'>
        <Stage width={this.state.screenWidth} height={this.state.screenHeight}>
          <Layer>
            <DrawMaze />
            
          </Layer>
          
        </Stage>
      </div>

    );
  }
}

export default App;


