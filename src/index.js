//TODO: build a website

const { isValidEan, calculateEan } = require("./utils.js");

const testEanArray = [
  // "123123asdwadea212e",
  1730020496575,
  "false",
  9730020371731,
  "ImAStringAndImTooLong",
  1234567,
  123456789123456789,
  true,
];

function calculator(input) {
  input.forEach((value) => {
    let [isNum, isCorrectLength, reason] = isValidEan(value);

    // Check if the input has a valid EAN format
    if (isNum != true || isCorrectLength != true) {
      return console.log(`${value} is not a valid input. ${reason}.`);
    } else {
      let [checkDigit, numberWithCheckDigit] = calculateEan(value);

      // Output to console
      let output = `Original Value: ${value} Check Digit: ${checkDigit} New Value: ${numberWithCheckDigit}`;
      console.log(output);
    }
  });
}

calculator(testEanArray);
