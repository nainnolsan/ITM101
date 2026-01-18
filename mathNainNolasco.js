// Get command line arguments
const operation = process.argv[2];
const num1 = Number(process.argv[3]);
const num2 = Number(process.argv[4]);

// Check if numbers are valid
if (isNaN(num1) || isNaN(num2)) {
  console.log("Please enter valid numbers.");
  process.exit(1);
}

let result;

// Perform the operation
switch (operation) {
  case "add":
    result = num1 + num2;
    break;
  case "subtract":
    result = num1 - num2;
    break;
  case "multiply":
    result = num1 * num2;
    break;
  case "divide":
    result = num1 / num2;
    break;
  case "exponent":
    result = num1 ** num2;
    break;
  default:
    console.log("Invalid operation. Use add, subtract, multiply, divide, or exponent.");
    process.exit(1);
}

// Output the result
console.log(`Result: ${result}`);
