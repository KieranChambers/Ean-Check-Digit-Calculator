// Checking if the input is valid format. I.e. 7 -> 17 numbers and not containing any non-numeric characters.
function isValidEan(input) {
  const isNum = /^\d+$/.test(input);
  const length = input.toString().length;
  let reason;

  const validLength = [7, 11, 12, 13, 16, 17].includes(length) ? true : false;

  !isNum
    ? (reason = "Not a Number")
    : !validLength
    ? (reason = "Incorrect Length. Supported EAN lengths: 7, 11, 12, 13, 16, 17")
    : (reason = "");

  return [isNum, validLength, reason];
}

// A function that converts a number to an array
// For example: 2320007711125 -> [2, 3, 2, 0, 0, 0, 7, 7, 1, 1, 1, 2, 5]
function convertToArray(num) {
  return Array.from(String(num), Number);
}

// A function that checks the length of an array and returns whether it's an
// even or odd amount of numbers. I.e. 12 or 13
function numberParity(arrayLength) {
  return arrayLength % 2 == 0 ? "even" : "odd";
}

// A functon for deciding what math we're using for odd/even length arrays
function oddEvenLogic(array, parity) {
  let tempArray = [];
  for (let i = 0; i < array.length; i++) {
    tempArray[i] = (parity === "even" ? i % 2 == 0 : i % 2 !== 0) ? array[i] : array[i] * 3;
  }
  return tempArray;
}

// The check digit is the nearest round number - totalSum
function calculateCheckDigit(totalSum) {
  let nearestRoundNumber = Math.ceil(totalSum / 10) * 10;
  return String(nearestRoundNumber - totalSum);
}

// Being called from index.js
function calculateEan(validEan) {
  let totalSum = 0;
  let arrayOfNumbers = convertToArray(validEan);
  let parity = numberParity(arrayOfNumbers.length);
  let tempArray = oddEvenLogic(arrayOfNumbers, parity);

  // Cycles through every position in the tempArray and adds those values to the totalSum
  tempArray.forEach((position) => {
    totalSum += position;
  });

  let checkDigit = calculateCheckDigit(totalSum);

  // Join the original input with the new check digit that we've calculated
  let numberWithCheckDigit = Number(arrayOfNumbers.join("") + checkDigit);
  return [Number(checkDigit), numberWithCheckDigit];
}

module.exports = { isValidEan, calculateEan };
