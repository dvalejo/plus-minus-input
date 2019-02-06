# plus-minus-input

Input field with plus and minus buttons.

### Usage

Add a link to the css file in your `<head>`:

```html
<link rel="stylesheet" type="text/css" href="plus-minus-input.css"/>
```

Add a link to the js file before closing `</body>` tag:

```html
<script src="plus-minus-input.min.js"/>
```

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
___

As a result, this input element:

```html
<input type="text" class="plus-minus-input" name="quantity">
```

Becomes this:

```html
<div class="plus-minus-input">
  <span class="plus-minus-input__minus">−</span>
  <input type="text" class="plus-minus-input__field" name="quantity" value="1">
  <span class="plus-minus-input__plus">+</span>
</div>
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