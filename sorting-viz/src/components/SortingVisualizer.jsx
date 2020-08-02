import React, { Component } from "react";
import "./SortingVisualizer.css";
class SortingVisualizer extends Component {
  constructor() {
    super();

    let arr = this.getRandomArray(47);
    this.state = {
      bars: [...arr],
      arraySize: 47,
    };
  }

  createNewArray = () => {
    console.log(this.state.arraySize);
    let arr = this.getRandomArray(this.state.arraySize);
    this.setState({ bars: [...arr] });
    console.log(this.state.arraySize);
  };

  handleSliderMovement = (e) => {
    this.setState({ arraySize: e.target.value });
    console.log(this.state.arraySize);
    this.createNewArray();
  };
  render() {
    const nums = this.state.bars.map((bar) => (
      <span
        className="bar"
        style={{ width: 900 / this.state.bars.length, height: bar * 1.5 }}
      >
        {bar}
      </span>
    ));
    // font size for the style if len > x
    // height: val * 2 in pixels

    return (
      <div className="sorting-visualizer">
        <div className="bars-container--wrapper">
          <div className="bars-container">{nums}</div>
        </div>
        <div className="button-container">
          <button onClick={this.createNewArray}>Generate New Array</button>
          <div className="slide-container">
            <input
              type="range"
              min="5"
              max="100"
              value={this.arraySize}
              className="slider"
              id="myRange"
              onChange={this.handleSliderMovement}
            ></input>
          </div>
          <button>Merge Sort</button>
          <button>Quick Sort</button>
          <button>Heap Sort</button>
          <button>Bubble Sort</button>
        </div>
      </div>
    );
  }
  getRandomArray = (arrSize) => {
    let arr = [];
    for (let i = 0; i < arrSize; i++) {
      arr.push(Math.floor(Math.random() * 500) + 6); // random int from 5, 500 inclusive
    }
    return arr;
  };
}

export default SortingVisualizer;
