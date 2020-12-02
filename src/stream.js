class Stream {
  constructor(str, start, end) {
    this.start = start || 0;
    this.end = end || str.length;
    this.str = str.substring(this.start, this.end);
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

  blackHole(matcher) {
    while(this.hasMore() && matcher(this.peek())) {
      this.poll();
    }
  }
}

module.exports = Stream;