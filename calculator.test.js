const Calculator = require('./calculator');

describe('Calculator - Requirement 1', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('single number returns itself', () => {
    expect(calculator.add('20')).toBe(20);
  });

  test('empty input returns 0', () => {
    expect(calculator.add('')).toBe(0);
  });

  test('missing numbers converted to 0', () => {
    expect(calculator.add('5,')).toBe(5);
    expect(calculator.add(',5')).toBe(5);
  });

  test('invalid numbers converted to 0', () => {
    expect(calculator.add('5,tytyt')).toBe(5);
  });
});

describe('Calculator - Requirement 2', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('handles many numbers', () => {
    expect(calculator.add('1,2,3,4,5,6,7,8,9,10,11,12')).toBe(78);
  });
});

describe('Calculator - Requirement 3', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('handles newline as delimiter', () => {
    expect(calculator.add('1\n2,3')).toBe(6);
  });
});

describe('Calculator - Requirement 4', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('throws exception for negative numbers', () => {
    expect(() => calculator.add('1,-2,3')).toThrow('Negative numbers not allowed: -2');
  });

  test('throws exception with all negative numbers', () => {
    expect(() => calculator.add('1,-2,-3,4')).toThrow('Negative numbers not allowed: -2, -3');
  });
});

describe('Calculator - Requirement 5', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('ignores numbers greater than 1000', () => {
    expect(calculator.add('2,1001,6')).toBe(8);
  });

  test('includes 1000 but excludes 1001', () => {
    expect(calculator.add('1000,1001')).toBe(1000);
  });
});

describe('Calculator - Requirement 6', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('supports custom delimiter', () => {
    expect(calculator.add('//#\n2#5')).toBe(7);
  });

  test('supports comma as custom delimiter', () => {
    expect(calculator.add('//,\n2,ff,100')).toBe(102);
  });
});

describe('Calculator - Requirement 7', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('supports multi-character delimiter', () => {
    expect(calculator.add('//[***]\n11***22***33')).toBe(66);
  });
});

describe('Calculator - Requirement 8', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('supports multiple delimiters', () => {
    expect(calculator.add('//[*][!][r9r]\n11r9r22*hh*33!44')).toBe(110);
  });
});