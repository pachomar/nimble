class Calculator {
  constructor() {
    this.upperBound = 1000;
    this.formula = '';
  }

  add(input) {
    if (!input || input.trim() === '') {
      this.formula = '0 = 0';
      return 0;
    }

    let delimiters = [',', '\n'];
    let stringified = input;

    if (input.startsWith('//')) {
      const section = input.split('\n')[0];
      stringified = input.substring(input.indexOf('\n') + 1);

      // Requirement 8: Multiple delimiters of any length
      if (section.includes('[')) {
        const matches = section.match(/\[([^\]]+)\]/g);
        if (matches) {
          delimiters = matches.map(d => d.slice(1, -1));
        }
      } else {
        delimiters = [section.substring(2)];
      }
    }

    let numbers = [stringified];
    for (const delimiter of delimiters) {
      numbers = numbers.flatMap(n => n.split(delimiter));
    }

    const parsed = numbers.map(n => {
      const trimmed = n.trim();
      if (trimmed === '') return 0;
	  
      const num = Number(trimmed);
      return isNaN(num) ? 0 : num;
    });

    const negatives = parsed.filter(n => n < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    // Stretch Goal 1: Display formula
    const valid = parsed.map(n => n > this.upperBound ? 0 : n);
    const result = valid.reduce((sum, n) => sum + n, 0);
    
    this.formula = `${valid.join('+')} = ${result}`;

    return result;
  }

  getFormula() {
    return this.formula;
  }
}

module.exports = Calculator;