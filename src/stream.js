class Stream {
  constructor(str, start, end) {
    this.str = str.substring(start || 0, end || str.length);
    this.start = 0;
    this.end = str.length;
    this.pos = 0;
  }

  hasMore() {
    return this.pos < this.end;
  }

  peek() {
    return this.str.charAt(this.pos);
  }

  poll() {
    return this.str.charAt(this.pos++);
  }

  accumulate(matcher) {
    let result = [];
    while(this.hasMore() && matcher(this.peek())) {
      result.push(this.poll());
    }
    return result.join('');
  }

  sink(matcher) {
    while(this.hasMore() && matcher(this.peek())) {
      this.poll();
    }
  }
}

module.exports = Stream;