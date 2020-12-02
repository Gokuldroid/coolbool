const TokenTypes = require("./token-types");
const Tokenizer = require("./tokenizer");
const Context = require('./context');

const operations = {
  [TokenTypes.NOT]: (value) => {
    return !value;
  },
  [TokenTypes.AND]: (value1, value2) => {
    return value1 && value2;
  },
  [TokenTypes.OR]: (value1, value2) => {
    return value1 || value2;
  }
}

class Parser {
  constructor(expression, isTruthy) {
    this.isTruthy = isTruthy || this.isTruthyDefault;
    this.tokenizer = new Tokenizer(expression);
  }

  isTruthyDefault(value) {
    return !!value;
  }

  eval(context) {
    let expressionContext = new Context(context, this.isTruthy);
    let tokens = this.tokenizer.tokens();
    let operators = [];
    let values = [];
    for (const token of tokens) {
      switch(token.type) {
        case TokenTypes.OPEN:
          operators.push(TokenTypes.OPEN);
          break;
        case TokenTypes.CLOSE:
          while(operators[operators.length - 1] !== TokenTypes.OPEN){
            let output = operations[operators.pop()](values.pop(), values.pop());
            values.push(output);
          }
          break;
        case TokenTypes.AND:
        case TokenTypes.OR:
        case TokenTypes.NOT:
          operators.push(token.value);
          break;
        default:
          if(operators.length > 0 && operators[operators.length - 1] === TokenTypes.NOT) {
            values.push(!expressionContext.getValue(token.value));
            operators.pop();
          } else {
            values.push(expressionContext.getValue(token.value));
          }
          break;
      }
    }

    while(operators.length > 0) {
      let output = operations[operators.pop()](values.pop(), values.pop());
      values.push(output);
    }
    return values.pop();
  }
}

module.exports = Parser;