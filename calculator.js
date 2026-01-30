class Calculator {
  add(input) {
    if (!input || input.trim() === '') {
      return 0;
    }

    const numbers = input.split(',');
    
    // Requirement 2: No maximum constraint removed
    
    // if (numbers.length > 2) {
    //   throw new Error('Maximum of 2 numbers allowed');
    // }

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