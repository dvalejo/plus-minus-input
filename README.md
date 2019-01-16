# plus-minus-input

Input field with plus and minus buttons.

## !!! UNDER DEVELOPMENT, SORRY !!!

### Install

Install package with npm:

`npm install plus-minus-input --save`

### Load

#### Webpack

Load the required stylesheet and JS:

```js
import "plus-minus-input/dist/plus-minus-input.css";
import pmInput from "plus-minus-input/dist/plus-minus-input.js";
```

#### Static HTML

Put the required stylesheet at the [top](https://developer.yahoo.com/performance/rules.html#css_top) of your markup:

```html
<link rel="stylesheet" href="/node_modules/plus-minus-input/dist/plus-minus-input.css" />
```

Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom) of your markup:

```html
<script src="/node_modules/plus-minus-input/dist/plus-minus-input.js"></script>
```

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
  incrementDelay: 50
});
```

#### Options

- `inputClass` - all inputs with this class will be converted,
- `defaultValue` - value of input after convertion,
- `minValue` - minumum value of input,
- `maxValue` - maximum value of input,
- `increment` - value of an input increment,
- `holdDelay` - time (in milliseconds) after mousedown to start auto-increment,
- `incrementDelay` - time (in milliseconds) between auto-increment

### License

GNU GPLv3