const readline = require('readline');
const Calculator = require('./calculator');
const CustomDelimiterParser = require('./interfaces/parsers');
const { NegativeNumberValidator, UpperBoundValidator } = require('./interfaces/validators');

// Parse command line arguments
const args = process.argv.slice(2);
const config = {
  upperBound: 1000,
  denyNegatives: true,
};

// Parse arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--upper-bound' && args[i + 1]) {
    config.upperBound = parseInt(args[i + 1]);
    i++;
  } else if (args[i] === '--allow-negatives') {
    config.denyNegatives = false;
  } else if (args[i] === '--delimiter' && args[i + 1]) {
    config.alternateDelimiter = args[i + 1];
    i++;
  } else if (args[i] === '--help') {
    console.log(`
Calculator Challenge - Console Application

Usage:
  node index.js [options]

Options:
  --upper-bound <number>    Set upper bound (default: 1000)
  --allow-negatives         Allow negative numbers
  --delimiter <char>        Set alternate delimiter (default: newline)
  --help                    Show this help message

Examples:
  node index.js
  node index.js --upper-bound 500
  node index.js --allow-negatives
  node index.js --delimiter ";"

Interactive Mode:
  Enter expressions and press Enter to calculate
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
console.log(`  Upper Bound: ${config.upperBound}`);
console.log(`  Deny Negatives: ${config.denyNegatives}`);
console.log(`  Alternate Delimiter: ${config.alternateDelimiter === '\n' ? '\\n (newline)' : config.alternateDelimiter}`);
console.log('\nEnter expressions (Ctrl+C to exit)');

function promptUser() {
  rl.question('> ', (input) => {
    if (!input.trim()) {
      promptUser();
      return;
    }

    try {
      const trimmed = input.replace(/\\n/g, '\n');
      const result = calculator.add(trimmed);

      console.log(`✓ Result: ${result}`);
      if (calculator.getFormula) {
        console.log(`  Formula: ${calculator.getFormula()}`);
      }
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