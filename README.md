# plus-minus-input

Input field with plus and minus buttons.

### Install

Install package with npm: `npm install plus-minus-input --save`

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

Call the function with your options:

```js
pmInput({});
```

### License

GNU GPLv3