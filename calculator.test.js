const Calculator = require('./calculator');

describe('Calculator - Requirement 1', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('single number returns itself', () => {
    expect(calculator.add('20')).toBe(20);
  });

  test('two numbers comma delimited', () => {
    expect(calculator.add('1,5000')).toBe(5001);
  });

  test('handles negative numbers', () => {
    expect(calculator.add('4,-3')).toBe(1);
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

  test('throws exception for more than 2 numbers', () => {
    expect(() => calculator.add('1,2,3')).toThrow('Maximum of 2 numbers allowed');
  });
});