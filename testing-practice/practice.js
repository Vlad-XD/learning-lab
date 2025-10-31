// takes a string and returns it with the first character capitalized
function capitalize(str) {
  // iterate through string until first non-whitespace character is found
  let validIndex = 0;
  while (str[validIndex] === " " && validIndex < str.length) {
    validIndex++;
  }

  // utilize valid index to split string up and capitalize the first non-whitespace character
  if (validIndex >= str.length) {
    return str;
  } else {
    return (
      str.slice(0, validIndex) +
      str[validIndex].toUpperCase() +
      str.slice(validIndex + 1)
    );
  }
}

// takes a string and returns it reversed
function reverseString(str) {
  // use two pointers to reverse the string
  let leftPointer = 0;
  let rightPointer = str.length - 1;
  // let stringFront = "";
  // let stringBack = "";
  let reverseString = str;

  // string is reversed once pointers meet
  while (leftPointer < rightPointer) {
    reverseString =
      reverseString.slice(0, leftPointer) +
      str[rightPointer] +
      reverseString.slice(leftPointer + 1, rightPointer) +
      str[leftPointer] +
      reverseString.slice(rightPointer + 1);
    leftPointer++;
    rightPointer--;
  }

  return reverseString;
}

// object that contains functions for the basic operations: add, subtract, divide, and multiply
const calculator = {
  add: addFunc,
  subtract: subtractFunc,
  multiply: multiplyFunc,
  divide: divideFunc,
};

// helper function for calculator object
function addFunc(num1, num2) {
  return num1 + num2;
}

// helper function for calculator object
function subtractFunc(num1, num2) {
  return num1 - num2;
}

// helper function for calculator object
function multiplyFunc(num1, num2) {
  return num1 * num2;
}

// helper function for calculator object
function divideFunc(num1, num2) {
  const errorMsg = "Error";

  if (num2 === 0) {
    return errorMsg;
  }

  return num1 / num2;
}

// takes a string and a shift factor and returns it with each character “shifted”
function caesarCipher(str, shiftFactor) {
  const Z_UNICODE = "Z".charCodeAt(0);
  const A_UNICODE = "A".charCodeAt(0);
  const z_UNICODE = "z".charCodeAt(0);
  const a_UNICODE = "a".charCodeAt(0);
  const WRAPPING_FACTOR = 26;
  let cipheredString = "";

  // loop through each character of the string and utilize its unicode to shift the character into the cipher
  for (let i = 0; i < str.length; i++) {
    // test if character code is non-alphabetic
    const charCode = str[i].charCodeAt(0);
    if (
      charCode < A_UNICODE ||
      (charCode > Z_UNICODE && charCode < a_UNICODE) ||
      charCode > z_UNICODE
    ) {
      // if character is non-alphabetic, no shift
      cipheredString += str[i];
      continue;
    }

    // calculate code at shifted location
    const adjustedShiftFactor = shiftFactor % WRAPPING_FACTOR; // wraps large shift factors
    let shiftedCode = charCode + adjustedShiftFactor;

    // test for wrapping from 'z' to 'a' and 'Z' to 'A'
    if (shiftedCode > z_UNICODE && charCode > Z_UNICODE) {
      // wrap from 'z' to 'a'
      shiftedCode -= WRAPPING_FACTOR;
    } else if (shiftedCode < a_UNICODE && charCode > Z_UNICODE) {
      // wrap from 'a' to 'z'
      shiftedCode += WRAPPING_FACTOR;
    } else if (shiftedCode > Z_UNICODE && charCode < a_UNICODE) {
      // wrap from 'Z' to 'A'
      shiftedCode -= WRAPPING_FACTOR;
    } else if (shiftedCode < A_UNICODE && charCode < a_UNICODE) {
      // wrap from 'A' to 'Z'
      shiftedCode += WRAPPING_FACTOR;
    }

    // add shifted character to encrypted string
    const shiftedChar = String.fromCharCode(shiftedCode);
    cipheredString += shiftedChar;
  }

  return cipheredString;
}

// takes an array of numbers and returns an object with the following properties: average, min, max, and length
function analyzeArray(arr) {
  // return all zeroes if array is empty
  if (arr.length === 0) {
    return { average: 0, min: 0, max: 0, length: 0 };
  }

  const average = avgFunc(arr);
  const min = minFunc(arr);
  const max = maxFunc(arr);
  const length = arr.length;

  return { average, min, max, length };
}

// helper function for analyzeArray function
function minFunc(arr) {
  const min = arr.reduce((acc, curr) => {
    return acc < curr ? acc : curr;
  });
  return min;
}

// helper function for analyzeArray function
function maxFunc(arr) {
  const max = arr.reduce((acc, curr) => {
    return acc > curr ? acc : curr;
  });
  return max;
}

// helper function for analyzeArray function
function avgFunc(arr) {
  const sum = arr.reduce((acc, curr) => {
    return acc + curr;
  });
  const avg = sum / arr.length;
  return avg;
}

export { capitalize, reverseString, calculator, caesarCipher, analyzeArray };
