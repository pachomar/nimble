class Calculator {
  add(input) {
    if (!input || input.trim() === '') {
      return 0;
    }

    const numbers = input.split(/[,\n]/);

    const parsed = numbers.map(n => {
      const trimmed = n.trim();
      if (trimmed === '') return 0;
	  
      const num = Number(trimmed);
      return isNaN(num) ? 0 : num;
    });

    // Requirement 4: Deny negative numbers
    const negatives = parsed.filter(n => n < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return parsed.reduce((sum, n) => sum + n, 0);
  }
}

module.exports = Calculator;