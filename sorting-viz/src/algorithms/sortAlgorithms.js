export function getBubbleSortAnimations(array) {
   const animations = [];
   if (array.length <= 1) return array;
   let i = 0;
   let end = array.length - 1;
   while (end >= 0) {
      while (i < end) {
         let first = array[i];
         let second = array[i + 1];
         animations.push([i, i + 1]);
         animations.push([i, i + 1]);
         if (first >= second) {
            // swap the two
            let temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
         }
         animations.push([i, second, i + 1, first]);
         i++;
      }
      i = 0;
      end--;
   }
   animations.push([i, i + 1]);
   animations.push([i, i + 1]);
   animations.push([i, array[i], i + 1, array[i + 1]]);
   return animations;
}

export function getSelectionSortAnimations(array) {
   const animations = [];
   if (array.length <= 1) return array;
   for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
         animations.push([minIndex, j]);
         animations.push([minIndex, j]);
         if (array[minIndex] > array[j]) {
            minIndex = j;
         }
      }
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      animations.push([i, array[i], minIndex, array[minIndex]]);
   }
   return animations;
}
export function getHeapSortAnimations(array) {
   const animations = [];
   if (array.length <= 1) return array;
   console.log(array);
   buildMaxHeap(array, animations);
   console.log(array);
   let last = array.length - 1;
   while (last > 0) {
      animations.push([0, last]);
      animations.push([0, last]);
      let temp = array[last];
      array[last] = array[0];
      array[0] = temp;
      animations.push([0, array[0], last, array[last]]);
      percolateDown(array, 0, last, animations);
      last--;
   }
   console.log(array);
   return animations;
}
function buildMaxHeap(array, animations) {
   let index = Math.floor(array.length / 2);
   while (index >= 0) {
      percolateDown(array, index, array.length, animations);
      index--;
   }
}
function percolateDown(array, start, end, animations) {
   if (start >= Math.floor(end / 2)) {
      return;
   }
   let left = start * 2 + 1;
   let right = start * 2 + 2 < end ? start * 2 + 2 : null;
   let swap;
   if (right) {
      swap = array[left] > array[right] ? left : right;
   } else {
      swap = left;
   }
   if (array[start] < array[swap]) {
      let temp = array[swap];
      array[swap] = array[start];
      array[start] = temp;
      percolateDown(array, swap, end, animations);
   }
}

// thanks to clement for mergesort implementation
// https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial
export function getMergeSortAnimations(array) {
   const animations = [];
   if (array.length <= 1) return array;
   const auxiliaryArray = array.slice();
   mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
   return animations;
}

function mergeSortHelper(
   mainArray,
   startIdx,
   endIdx,
   auxiliaryArray,
   animations
) {
   if (startIdx === endIdx) return;
   const middleIdx = Math.floor((startIdx + endIdx) / 2);
   mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
   mergeSortHelper(
      auxiliaryArray,
      middleIdx + 1,
      endIdx,
      mainArray,
      animations
   );
   doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
   mainArray,
   startIdx,
   middleIdx,
   endIdx,
   auxiliaryArray,
   animations
) {
   let k = startIdx;
   let i = startIdx;
   let j = middleIdx + 1;
   while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
         animations.push([k, auxiliaryArray[i]]);
         mainArray[k++] = auxiliaryArray[i++];
      } else {
         animations.push([k, auxiliaryArray[j]]);
         mainArray[k++] = auxiliaryArray[j++];
      }
   }
   while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
   }
   while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
   }
}
