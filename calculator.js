const CustomDelimiterParser = require('./interfaces/parsers');

class Calculator {
  constructor(parser = new CustomDelimiterParser(), validators = []) {
    this.parser = parser;
    this.validators = validators;
    this.formula = '';
  }

  // Stretch Goal 5: Configurable negative denial
  calculate(input, operation = 'add') {
    if (!input || input.trim() === '') {
      this.formula = '0 = 0';
      return 0;
    }

    const { delimiters, stringified } = this.parser.parse(input);

    let numbers = [stringified];
    for (const delimiter of delimiters) {
      numbers = numbers.flatMap(n => n.split(delimiter));
    }

    let parsed = numbers.map(n => {
      const trimmed = n.trim();
      if (trimmed === '') return 0;
	  
      const num = Number(trimmed);
      return isNaN(num) ? 0 : num;
    });

    for (const validator of this.validators) {
      parsed = validator.validate(parsed);
    }

    let result;
    let symbol;

    switch (operation) {
      case 'subtract':
        result = parsed.reduce((acc, n, i) => i === 0 ? n : acc - n);
        symbol = '-';
        break;
      case 'multiply':
        result = parsed.reduce((acc, n) => acc * n, 1);
        symbol = '*';
        break;
      case 'divide':
        result = parsed.reduce((acc, n, i) => {
          if (i === 0) return n;
          if (n === 0) throw new Error("Division by zero");
          return acc / n;
        });
        symbol = '/';
        break;
      default: // add
        result = parsed.reduce((sum, n) => sum + n, 0);
        symbol = '+';
    }

    this.formula = `${parsed.join(symbol)} = ${result}`;
    return result;
  }

  add(input) {
    return this.calculate(input, 'add');
  }

  subtract(input) {
    return this.calculate(input, 'subtract');
  }

  multiply(input) {
    return this.calculate(input, 'multiply');
  }

  divide(input) {
    return this.calculate(input, 'divide');
  }

  getFormula() {
    return this.formula;
  }
}

module.exports = Calculator;