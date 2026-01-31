class NumberValidator {
  validate(numbers) {
    return numbers;
  }
}

class NegativeNumberValidator extends NumberValidator {
  validate(numbers) {
    const negatives = numbers.filter(n => n < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }
    return numbers;
  }
}

class UpperBoundValidator extends NumberValidator {
  constructor(upperBound = 1000) {
    super();
    this.upperBound = upperBound;
  }

  validate(numbers) {
    return numbers.map(n => n > this.upperBound ? 0 : n);
  }
}

module.exports = {
  NegativeNumberValidator,
  UpperBoundValidator
};