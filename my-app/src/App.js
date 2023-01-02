import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';
import { createMazeArray, roundNum } from './Maze.js';
import { updateReal, updateVirtual } from './Player.js';
import useImage from 'use-image';
import './App.scss';

const start = {
  restart: true,
  direction: "",
  virtualPosition: [0, 1],
  realPosition: [1, 21],
  food: [200, 70],
  score: 0,
  screenWidth: 0,
  screenHeight: 0
};

var l = [0, 0]
var rl = [1, 21]
var mazeDataArray = [];
const nr = new Array(31);

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }


  }

  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={20}
        height={20}
        fill={"red"}
      />
    );
  }
}


class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#383e5e'
    }
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor(e) {
    this.setState({
      color: { e }
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
  const start = [1, 0];
  const row = 15;
  const col = 15;
  const end = [2 * row - 1, 2 * col];
  for (let i = 0, len = mazeDataArray.length; i < len; i++) {
    // new row
    let row_x = 1
    let row_y = i * 20 + 1

    for (let j = 0, len = mazeDataArray[i].length; j < len; j++) {


      // start
      if (i === start[0] && j === start[1]) {
        mazeDataArray[i][j].se = true;
      }
      // end
      if (i === end[0] && j === end[1]) {
        mazeDataArray[i][j].se = true;

      }
      // road
      if (mazeDataArray[i][j].value) {
        blocks.push(<Road x={row_x + (j * 20)} y={row_y} />);
        nr[i][j] = 'r';
      }

    }
  }
  for (let i = 0, len = mazeDataArray.length; i < len; i++) {
    // new row
    let row_x = 1
    let row_y = i * 20 + 1

    for (let j = 0, len = mazeDataArray[i].length; j < len; j++) {
      // start
      if (i === start[0] && j === start[1]) {

      }
      // end
      if (i === end[0] && j === end[1]) {

      }
      // wall
      if (!mazeDataArray[i][j].value) {
        blocks.push(<Wall x={row_x + (j * 20)} y={row_y} />);
        nr[i][j] = 'w';
      }

    }
  }
  return blocks;


}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = start;
  }



  static getDerivedStateFromProps() {
    //this.restartCheck(true);
    return {

      screenWidth: window.innerWidth / 1.5,
      screenHeight: window.innerHeight - 50
    };
  }

  handleKeys = event => {
    var realPosition = this.state.realPosition;

    //	left
    if (event.keyCode === 37 && realPosition[0] > 20) {

      if (nr[l[0] - 1][l[1]] === 'r') {

        this.setState({ direction: "left" });
      }
    }

    // up
    if (event.keyCode === 38 && realPosition[1] > 20) {
      if (nr[l[0]][l[1] - 1] === 'r') {
        this.setState({ direction: "up" });
      }

    }

    //right
    if (event.keyCode === 39 && realPosition[0] < 14 * 42) {

      console.log("vp", l[0] + 1, l[1], nr[l[0] + 1][l[1]]);
      if (nr[l[0] + 1][l[1]] === 'r') {
        this.setState({ direction: "right" });

      }

    }

    //down
    if (event.keyCode === 40 && realPosition[1] < 14 * 42) {
      if (nr[l[0]][l[1] + 1] === 'r') {
        this.setState({ direction: "down" });
      }

    }
  };

  updatePlayer() {
    var direction = this.state.direction;
    const realPosition = this.state.realPosition;
    const virtualPosition = this.state.virtualPosition;

    const newRealPosition = updateReal(direction, realPosition);
    const newvirtualPosition = updateVirtual(direction, virtualPosition);
    this.setState({ realPosition: newRealPosition, direction: "", virtualPosition: newvirtualPosition });

  }

  restartGame(start) {
    if (start != null) {
      this.setState({ restart: true });
    }


    if (this.state.restart) {
      mazeDataArray = createMazeArray(15, 15);

      for (var i = 0; i < nr.length; i++) {
        nr[i] = new Array(31);
      }

    }

    this.setState({ restart: false })
  }


  componentDidMount() {
    this.setState({ restart: true })
    this.restartGame();

  }
  componentDidUpdate(prevProps, prevState) {
    var speed = 150;
    document.addEventListener("keydown", this.handleKeys, false);
    clearInterval(this.interval);
    this.interval = setInterval(() => this.updatePlayer(), speed);
  }

  render() {
    const vP = this.state.virtualPosition;
    const rP = this.state.realPosition;
    l = [vP[0], vP[1]];
    rl = [rP[0], rP[1]];
    //
    return (
      <div className='app-container container-fluid'>
        <div >
          <h1>The Maze Game</h1> <br />

          
          <h2>Score: {"1"}</h2><br />
          <button className='btn btn-success btn-lg restart' onClick={() => this.restartGame('1')} >Start Over</button><br />
          </div>


          {/* <h2>D: {this.state.direction}</h2><br />
          <h2>X: {rP[0]}</h2><br />
          <h2>y: {rP[1]}</h2><br />
          <h2>vX: {vP[0]}</h2><br />
          <h2>vy: {vP[1]}</h2><br /> */}

          <Stage width={630} height={630}>

            <Layer>
              <DrawMaze mazeDataArray />


              <Player x={this.state.realPosition[0]} y={this.state.realPosition[1]} />
            </Layer>

          </Stage>


        </div>


        );
  }
}

        export default App;


