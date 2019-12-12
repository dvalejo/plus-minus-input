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
inputCounter({
  selector: "my-counter",
  minValue: 0,
  maxValue: 1000,
  increment: 1,
});
```
As a result, this input element:

```html
<input type="text" class="my-counter" name="quantity">
```

Becomes this:

```html
<div class="input-counter">
  <button class="input-counter__minus">−</button>
  <input type="text" class="my-counter input-counter__field" name="quantity" value="1">
  <button class="input-counter__plus">+</button>
</div>
```

The same result can be achieved with HTML attributes instead of options object:

```html
<input type="text" class="my-counter" name="quantity" max-value="1000" min-value="0" increment="1" value="1">
```

#### Options

- `selector` - all inputs that match this selector will be converted,
- `minValue` - minumum value of input,
- `maxValue` - maximum value of input,
- `increment` - value of an input increment,