const readline = require('readline');
const Calculator = require('./calculator');
const CustomDelimiterParser = require('./interfaces/parsers');
const { NegativeNumberValidator, UpperBoundValidator } = require('./interfaces/validators');

// Parse command line arguments
const args = process.argv.slice(2);
const config = {
  upperBound: 1000,
  denyNegatives: true,
  operation: 'add',
};

// Parse arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--upper-bound' && args[i + 1]) {
    config.upperBound = parseInt(args[i + 1]);
    i++;
  } else if (args[i] === '--allow-negatives') {
    config.denyNegatives = false;
  } else if (args[i] === '--operation' && args[i + 1]) {
    const validOps = ['add', 'subtract', 'multiply', 'divide'];
    if (validOps.includes(args[i + 1])) {
      config.operation = args[i + 1];
    } else {
      console.error(`Invalid operation: ${args[i + 1]}. Valid options: ${validOps.join(', ')}`);
      process.exit(1);
    }
    i++;
  } else if (args[i] === '--add') {
    config.operation = 'add';
  } else if (args[i] === '--subtract') {
    config.operation = 'subtract';
  } else if (args[i] === '--multiply') {
    config.operation = 'multiply';
  } else if (args[i] === '--divide') {
    config.operation = 'divide';
  } else if (args[i] === '--help') {
    console.log(`
Calculator Challenge - Console Application

Usage:
  node index.js [options]

Options:
  --upper-bound <number>    Set upper bound (default: 1000)
  --allow-negatives         Allow negative numbers
  --operation <operation>   Set operation (default: add)
  --add                     Shortcut for --operation add
  --subtract                Shortcut for --operation subtract
  --multiply                Shortcut for --operation multiply
  --divide                  Shortcut for --operation divide
  --help                    Show this help message

Valid operations: add, subtract, multiply, divide

Examples:
  node index.js
  node index.js --upper-bound 500
  node index.js --allow-negatives
  node index.js --operation multiply
  node index.js --subtract
  node index.js --divide --allow-negatives

Interactive Mode:
  Enter expressions and press Enter to calculate
  Use \\n for newline delimiter (e.g., 1\\n2,3)
  Press Ctrl+C to exit
    `);
    process.exit(0);
  }
}

// Build validators based on config
const validators = [];
if (config.denyNegatives) validators.push(new NegativeNumberValidator());
validators.push(new UpperBoundValidator(config.upperBound));
const calculator = new Calculator(new CustomDelimiterParser(), validators);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('╔════════════════════════════════════════════╗');
console.log('║   Calculator Challenge - Interactive Mode  ║');
console.log('╚════════════════════════════════════════════╝');
console.log('\nConfiguration:');
console.log(`  Operation: ${config.operation.toUpperCase()}`);
console.log(`  Upper Bound: ${config.upperBound}`);
console.log(`  Deny Negatives: ${config.denyNegatives}`);
console.log('\nEnter expressions (Ctrl+C to exit)');

function promptUser() {
  rl.question('> ', (input) => {
    if (!input.trim()) {
      promptUser();
      return;
    }

    try {
      const trimmed = input.replace(/\\n/g, '\n');
      const result = calculator.calculate(trimmed, config.operation);

      console.log(`✓ Result: ${result}`);
      console.log(`  Formula: ${calculator.getFormula()}`);
      console.log();
    } catch (error) {
      console.error(`✗ Error: ${error.message}\n`);
    }
    promptUser();
  });
}

promptUser();

rl.on('SIGINT', () => {
  console.log('\n\n👋 Goodbye!');
  process.exit(0);
});