
const pmInput__es6 = (function () {

  function mergeOptions(defOpts, opts) {
    const resultOpts = {};
    if ((typeof defOpts !== "object") || (typeof opts !== "object")) return;
    for (let key in defOpts) {
      resultOpts[key] = opts.hasOwnProperty(key) ? opts[key] : defOpts[key];
    }
    return resultOpts;
  }

  // -------------------------------------------------------------------------------------------------------
  class PlusMinusInput {

    constructor(inputElement, options) {
      this.inputElement = inputElement;
      this.inputClass = options.inputClass;
      this.defaultValue = options.defaultValue;
      this.minValue = options.minValue;
      this.maxValue = options.maxValue;
      this.increment = options.increment;
      this.holdDelay = options.holdDelay;
      this.incrementDelay = options.incrementDelay;
      this.minusContent = options.minusContent;
      this.plusContent = options.plusContent;
    }

    init() {
      if (this.minValue > this.maxValue) this.minValue = this.maxValue;
      if (this.defaultValue < this.minValue) this.defaultValue = this.minValue;
      if (this.defaultValue > this.maxValue) this.defaultValue = this.maxValue;
      this.render().setInputValue(this.defaultValue).attachEventListeners();
    }

    setInputValue(value) {
      this.inputElement.value = value.toString();
      this.inputElement.setAttribute("value", this.inputElement.value);
      return this;
    }

    render() {
      this.wrapper = document.createElement("div");
      this.plusBtn = document.createElement("span");
      this.minusBtn = document.createElement("span");
      let parent = this.inputElement.parentNode;

      this.wrapper.className = this.inputClass;
      this.minusBtn.className = this.inputClass + "__minus";
      this.minusBtn.innerHTML = this.minusContent;
      this.plusBtn.className = this.inputClass + "__plus";
      this.plusBtn.innerHTML = this.plusContent;
      this.inputElement.className = this.inputClass + "__field";

      this.wrapper.appendChild(this.minusBtn);
      this.wrapper.appendChild(this.inputElement);
      this.wrapper.appendChild(this.plusBtn);
      parent.appendChild(this.wrapper);
      return this;
    }

    attachEventListeners() {
      this.minusBtn.addEventListener("click", event => this.minusOnClick(event));
      this.minusBtn.addEventListener("mousedown", event => this.minusOnMousedown(event));
      this.minusBtn.addEventListener("mouseup", () => this.clearTimers());
      this.minusBtn.addEventListener("mouseout", () => this.clearTimers());
      this.plusBtn.addEventListener("click", event => this.plusOnClick(event));
      this.plusBtn.addEventListener("mousedown", event => this.plusOnMousedown(event));
      this.plusBtn.addEventListener("mouseup", () => this.clearTimers());
      this.plusBtn.addEventListener("mouseout", () => this.clearTimers());
      this.inputElement.addEventListener("input", event => this.inputOnInput(event));
      return this;
    }

    minusOnClick(event) {
      let value = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        value = ((value - this.increment) > this.minValue) ? (value - this.increment) : this.minValue;
      }
      else {
        value = this.defaultValue;
      }
      this.setInputValue(value);
    }

    minusOnMousedown(event) {
      let value;
      let oldValue = parseInt(this.inputElement.value);
      let increment = this.increment;
      this.holdTimerId = setTimeout(() => {
        this.incrementTimerId = setInterval(() => {
          value = parseInt(this.inputElement.value);
          if ((value - increment) > this.minValue) {
            value -= increment;
            if ((oldValue - value) > (increment * 30)) {
              increment *= 11;
            }
          }
          else {
            value = this.minValue;
          }
          this.setInputValue(value);
        }, this.incrementDelay);
      }, this.holdDelay);
    }

    plusOnClick(event) {
      let value = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        value = ((value + this.increment) < this.maxValue) ? (value + this.increment) : this.maxValue;
      }
      else {
        value = this.defaultValue;
      }
      this.setInputValue(value);
    }

    plusOnMousedown(event) {
      let value;
      let oldValue = parseInt(this.inputElement.value);
      let increment = this.increment;
      this.holdTimerId = setTimeout(() => {
        this.incrementTimerId = setInterval(() => {
          value = parseInt(this.inputElement.value);
          if ((value + increment) < this.maxValue) {
            value += increment;
            if ((value - oldValue) > (increment * 30)) {
              increment *= 11;
            }
          }
          else {
            value = this.maxValue;
          }
          this.setInputValue(value);
        }, this.incrementDelay);
      }, this.holdDelay);
    }

    inputOnInput(event) {
      let value = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        if (value > this.maxValue) value = this.maxValue;
        if (value < this.minValue) value = this.minValue;
      }
      else {
        value = this.defaultValue;
      }
      this.setInputValue(value);
    }

    clearTimers(event) {
      if (this.incrementTimerId) { clearInterval(this.incrementTimerId); }
      if (this.holdTimerId) { clearTimeout(this.holdTimerId); }
    }
  }

  // -------------------------------------------------------------------------------------------------------
  return function plusMinusInputFactory(options) {

    const defaultOptions = {
      inputClass: "plus-minus-input",
      defaultValue: 1,
      minValue: 0,
      maxValue: 1000,
      increment: 1,
      holdDelay: 500,
      incrementDelay: 50,
      minusContent: "&minus;",
      plusContent: "&plus;"
    }
    const pmOptions = mergeOptions(defaultOptions, options);
    let elements;

    try {
      elements = document.querySelectorAll("." + pmOptions.inputClass);
    }
    catch (error) {
      console.warn("PlusMinusInput >> Please enter a valid inputClass. " + error);
      return;
    }

    if (elements.length === 0) {
      console.warn("PlusMinusInput >> Your collection has 0 elements. Check your inputClass.");
      return;
    }

    if (pmOptions.defaultValue < pmOptions.minValue || pmOptions.defaultValue > pmOptions.maxValue) {
      console.warn("PlusMinusInput >> Default value of input must be more than minValue and less than maxValue");
    }

    if (pmOptions.minValue > pmOptions.maxValue) {
      console.warn("PlusMinusInput >> minValue of input must be less than maxValue");
    }

    for (let i = 0, len = elements.length; i < len; i++) {
      new PlusMinusInput(elements[i], pmOptions).init();
    }
  }
  // -------------------------------------------------------------------------------------------------------

})();