const testArrays = [
  [],                        // []
  [73],                      // [73]
  [1, 2, 3, 4, 5],           // [1, 2, 3, 4, 5]
  [3, 2, 1, 13, 8, 5, 0, 1], // [0, 1, 1, 2, 3, 5, 8, 13]
  [105, 79, 100, 110]        // [79, 100, 105, 110]
];

for (const arr of testArrays) {
  console.log(mergeSort(arr));
}

function mergeSort(arr) {
  // base case: 1 element left, return the array w/ one element (or return an empty array if empty)
  if (arr.length < 2) {
    return arr;
  }

  // recursive case:
  // sort left and right halves of the array and merge the sorted halves
  const halfPoint = Math.floor(arr.length / 2);
  const leftHalf = mergeSort(arr.slice(0, halfPoint));
  const rightHalf = mergeSort(arr.slice(halfPoint));
  
  // merge sorted halfs to make the combined sorted array
  let sortedArray = [];
  let leftPointer = 0;
  let rightPointer = 0;

  // use pointers to compare elements of each half
  while(sortedArray.length < (leftHalf.length + rightHalf.length)) {
    if (leftPointer >= leftHalf.length) {
      sortedArray.push(rightHalf[rightPointer]);
      rightPointer++;
    } else if (rightPointer >= rightHalf.length) {
      sortedArray.push(leftHalf[leftPointer]);
      leftPointer++;     
    } else {
      if (leftHalf[leftPointer] <= rightHalf[rightPointer]) {
        sortedArray.push(leftHalf[leftPointer]);
        leftPointer++;
      } else {
        sortedArray.push(rightHalf[rightPointer]);
        rightPointer++;
      }
    }
  }

  return sortedArray;

}