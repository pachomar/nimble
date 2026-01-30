class Calculator {
  add(input) {
    if (!input || input.trim() === '') {
      return 0;
    }

    // Requirement 3: Support newline as delimiter
    const numbers = input.split(/[,\n]/);

    const parsed = numbers.map(n => {
      const trimmed = n.trim();
      if (trimmed === '') return 0;
	  
      const num = Number(trimmed);
      return isNaN(num) ? 0 : num;
    });

    return parsed.reduce((sum, n) => sum + n, 0);
  }
}

module.exports = Calculator;