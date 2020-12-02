const Stream = require("./stream");
const TokenTypes = require("./token-types");

const isSpace = (char) => char == ' ' || char == '';
const isAlpha = (char) => ('a' <= char && char <= 'z') || ('A' <= char && char <= 'Z');

class Tokenizer {
  constructor(str) {
    this.str = str;
  }

  tokens() {
    this._tokens = this._tokens || this.parseTokens();
    return this._tokens;
  }

  parseTokens() {
    let tokens = [];
    let stream = new Stream(this.str);
   
    while(stream.hasMore()) {
      stream.blackHole(isSpace);
      switch(stream.peek()) {
        case TokenTypes.OPEN:
        case TokenTypes.CLOSE:
        case TokenTypes.AND:
        case TokenTypes.OR:
        case TokenTypes.NOT:
          let tkn = stream.poll();
          tokens.push({
            type: tkn,
            value: tkn
          })
          break;
        default:
          let variable = stream.accumulate(isAlpha);
          if(variable && variable.length !== 0) {
            tokens.push({
              type: TokenTypes.VALUE,
              value: variable
            })
          }
      }
    }
    return tokens;
  }
}

module.exports = Tokenizer;