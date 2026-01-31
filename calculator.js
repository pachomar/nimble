const CustomDelimiterParser = require('./interfaces/parsers');

class Calculator {
  constructor(parser = new CustomDelimiterParser(), validators = []) {
    this.parser = parser;
    this.validators = validators;
    this.formula = '';
  }

  add(input) {
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

    const result = parsed.reduce((sum, n) => sum + n, 0);
    this.formula = `${parsed.join('+')} = ${result}`;

    return result;
  }

  getFormula() {
    return this.formula;
  }
}

module.exports = Calculator;