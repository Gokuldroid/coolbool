### Boolean expression parser for Node js.

##### installation:

```bash
npm i @lazyloop/coolbool
```

##### usage:

```js

const { Parser } = require('@lazyloop/coolbool');
let parser = new Parser('one & two');
parser.eval({
  one: true,
  two: false
})
```
