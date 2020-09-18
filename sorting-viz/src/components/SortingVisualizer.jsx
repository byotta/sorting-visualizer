import React, { Component } from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../algorithms/sortAlgorithms.js";
import { Button } from "@material-ui/core";
class SortingVisualizer extends Component {
   constructor() {
      super();

      let arr = this.getRandomArray(47);
      this.state = {
         bars: [...arr],
         arraySize: 47,
      };
   }

   // mergeSort implementation from https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial
   mergeSort() {
      const animations = getMergeSortAnimations(this.state.bars);
      for (let i = 0; i < animations.length; i++) {
         const arrayBars = document.getElementsByClassName("bar");
         const isColorChange = i % 3 !== 2;
         if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? "red" : "pink";
            setTimeout(() => {
               barOneStyle.backgroundColor = color;
               barTwoStyle.backgroundColor = color;
            }, i * 2); // 2 is the animation speed
         } else {
            setTimeout(() => {
               const [barOneIdx, newHeight] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               barOneStyle.height = `${newHeight}px`;
            }, i * 2);
         }
      }
   }

   createNewArray = () => {
      let arr = this.getRandomArray(this.state.arraySize);
      this.setState({ bars: arr });
   };

   handleSliderMovement = (e) => {
      this.setState({ arraySize: e.target.value });
      this.createNewArray();
      console.log("arraySize", this.state.arraySize);
      console.log("length", this.state.bars.length);
   };
   render() {
      let barClassName = "bar-text-transparent";
      if (this.state.arraySize < 10) {
         barClassName = "bar-text-opaque";
      }
      const nums = this.state.bars.map((bar) => (
         <span
            className="bar"
            style={{
               width: 900 / this.state.bars.length,
               height: bar * 1.75,
            }}
         >
            <div className={barClassName}>{bar}</div>
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
               <Button
                  size="small"
                  variant="contained"
                  onClick={this.createNewArray}
               >
                  Generate New Array
               </Button>
               <div className="slide-container">
                  <input
                     type="range"
                     min="5"
                     max="200"
                     value={this.arraySize}
                     className="slider"
                     id="myRange"
                     onChange={this.handleSliderMovement}
                  ></input>
               </div>
               <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => this.mergeSort()}
               >
                  Merge Sort
               </Button>
               <Button size="small" variant="contained" color="primary">
                  Quick Sort
               </Button>
               <Button size="small" variant="contained" color="primary">
                  Heap Sort
               </Button>
               <Button size="small" variant="contained" color="primary">
                  Bubble Sort
               </Button>
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
