# plus-minus-input

Input field with plus and minus buttons.

### Usage

Call the function. Here is an example with default options:

```js
pmInput({
  inputClass: "plus-minus-input",
  defaultValue: 1,
  minValue: 0,
  maxValue: 1000,
  increment: 1,
  holdDelay: 500,
  incrementDelay: 50,
  minusContent: "&minus;",
  plusContent: "&plus;"
});
```

#### Options

- `inputClass` - all inputs with this class will be converted,
- `defaultValue` - value of input after convertion,
- `minValue` - minumum value of input,
- `maxValue` - maximum value of input,
- `increment` - value of an input increment,
- `holdDelay` - time (in milliseconds) after mousedown to start auto-increment,
- `incrementDelay` - time (in milliseconds) between auto-increment,
- `minusContent` - minus symbol to display,
- `plusContent` - plus symbol to display