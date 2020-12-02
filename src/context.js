class Context {
  constructor(values, isTruthy) {
    this.values = values;
    this.isTruthy = isTruthy;
  }

  getValue(value) {
    return this.isTruthy(this.values[value]);
  }
}

module.exports = Context;