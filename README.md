# input-counter

Input field with plus and minus buttons. ***es5 compatible***

### Usage

Add a link to the css file in your `<head>`:

```html
<link rel="stylesheet" type="text/css" href="input-counter.css"/>
```

Add a link to the js file before closing `</body>` tag:

```html
<script src="input-counter.min.js"/>
```

Call the function. Here is an example with default options:

```js
pmInput({
  inputClass: "input-counter",
  defaultValue: 1,
  minValue: 0,
  maxValue: 1000,
  increment: 1,
});
```
___

As a result, this input element:

```html
<input type="text" class="input-counter" name="quantity">
```

Becomes this:

```html
<div class="input-counter">
  <span class="input-counter__minus">−</span>
  <input type="text" class="input-counter__field" name="quantity" value="1">
  <span class="input-counter__plus">+</span>
</div>
```

#### Options

- `inputClass` - all inputs with this class will be converted,
- `defaultValue` - value of input after convertion,
- `minValue` - minumum value of input,
- `maxValue` - maximum value of input,
- `increment` - value of an input increment,