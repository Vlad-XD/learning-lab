console.log(fibs(8));     // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(fibsRec(8));

// takes a number and returns an array containing that many numbers from the Fibonnaci sequence
// assuming the input is an integer that is >= 1
function fibs(n) {
  const fibSequence = [0];

  if ( n === 1 ) {
    return fibSequence;
  }

  fibSequence.push(1);
  if (n === 2) {
    return fibSequence;
  }

  for (let i = 2; i < n; i++) {
    fibSequence.push(fibSequence[i-1] + fibSequence[i-2]);
  }

  return fibSequence;
}

//  same as the function fibs, be utilizes recursion
function fibsRec(n) {
  if (n === 1) {
    return [0];
  }

  if (n === 2) {
    return fibsRec(1).concat([1]);
  }

  let fibSequence = fibsRec(n-1);
  const nextFibNum = fibSequence[n-2] + fibSequence[n-3];
  fibSequence = fibSequence.concat(nextFibNum);

  return fibSequence;
}
