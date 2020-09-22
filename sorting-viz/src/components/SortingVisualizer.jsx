import React, { Component } from "react";
import "./SortingVisualizer.css";
import {
   getMergeSortAnimations,
   getBubbleSortAnimations,
   getSelectionSortAnimations,
   getHeapSortAnimations,
} from "../algorithms/sortAlgorithms.js";
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
   bubbleSort() {
      const animations = getBubbleSortAnimations(this.state.bars);
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
            }, i * 1); // 2 is the animation speed
         } else {
            setTimeout(() => {
               const [
                  barOneIdx,
                  newHeight1,
                  barTwoIdx,
                  newHeight2,
               ] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               const barTwoStyle = arrayBars[barTwoIdx].style;
               barOneStyle.height = `${newHeight1}px`;
               barTwoStyle.height = `${newHeight2}px`;
            }, i * 1);
         }
      }
   }
   selectionSort() {
      const animations = getSelectionSortAnimations(this.state.bars);
      let red = true;
      for (let i = 0; i < animations.length; i++) {
         const arrayBars = document.getElementsByClassName("bar");
         const isColorChange = animations[i].length === 2;
         if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            let color = red ? "red" : "pink";
            red = !red;
            setTimeout(() => {
               barOneStyle.backgroundColor = color;
               barTwoStyle.backgroundColor = color;
            }, i * 1); // 2 is the animation speed
         } else {
            setTimeout(() => {
               const [barOneIdx, newHeight] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               barOneStyle.height = `${newHeight}px`;
            }, i * 1);
         }
      }
   }
   heapSort() {
      const animations = getHeapSortAnimations(this.state.bars);
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
            }, i * 5); // 5 is the animation speed
         } else {
            setTimeout(() => {
               const [
                  barOneIdx,
                  newHeight1,
                  barTwoIdx,
                  newHeight2,
               ] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               const barTwoStyle = arrayBars[barTwoIdx].style;
               barOneStyle.height = `${newHeight1}px`;
               barTwoStyle.height = `${newHeight2}px`;
            }, i * 5);
         }
      }
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
   };
   render() {
      let barClassName = "bar-text-transparent";
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
               <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => this.selectionSort()}
               >
                  Selection Sort
               </Button>
               <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => this.heapSort()}
               >
                  Heap Sort
               </Button>
               <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => this.bubbleSort()}
               >
                  Bubble Sort
               </Button>
            </div>
         </div>
      );
   }
   getRandomArray = (arrSize) => {
      let arr = [];
      for (let i = 0; i < arrSize; i++) {
         arr.push(Math.floor(Math.random() * 480) + 6); // random int from 5, 480 inclusive
      }
      return arr;
   };
}

export default SortingVisualizer;
