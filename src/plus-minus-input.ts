const pmInput = (function () {

  // -------------------------------------------------------------------------------------------------------
  interface PlusMinusInputOptions {
    inputClass?: string;
    defaultValue?: number;
    minValue?: number;
    maxValue?: number;
    increment?: number;
    holdDelay?: number;
    incrementDelay?: number;
    minusContent?: string;
    plusContent?: string;
    [key: string]: string | number;
  }

  // -------------------------------------------------------------------------------------------------------
  function mergeOptions(defaultOptions: PlusMinusInputOptions, options: PlusMinusInputOptions) {
    const resultOptions: PlusMinusInputOptions = {};
    for (let key in defaultOptions) {
      resultOptions[key] = options.hasOwnProperty(key) ? options[key] : defaultOptions[key];
    }
    return resultOptions;
  }

  // -------------------------------------------------------------------------------------------------------
  class PlusMinusInput {

    private holdTimerId: NodeJS.Timer;
    private incrementTimerId: NodeJS.Timer;
    private wrapper: HTMLElement;
    private minusBtn: HTMLElement;
    private plusBtn: HTMLElement;

    constructor(
      private inputElement: HTMLInputElement,
      private options: PlusMinusInputOptions
    ) { }

    init(): void {
      if (this.options.minValue > this.options.maxValue) this.options.minValue = this.options.maxValue;
      if (this.options.defaultValue < this.options.minValue) this.options.defaultValue = this.options.minValue;
      if (this.options.defaultValue > this.options.maxValue) this.options.defaultValue = this.options.maxValue;
      this.render().setupEventListeners().setInputValue(this.options.defaultValue);
    }

    render(): PlusMinusInput {
      this.wrapper = document.createElement("div");
      this.plusBtn = document.createElement("span");
      this.minusBtn = document.createElement("span");
      const parent: Node = this.inputElement.parentNode;

      this.wrapper.className = this.options.inputClass;
      this.minusBtn.className = this.options.inputClass + "__minus";
      this.minusBtn.innerHTML = this.options.minusContent;
      this.plusBtn.className = this.options.inputClass + "__plus";
      this.plusBtn.innerHTML = this.options.plusContent;
      this.inputElement.className = this.options.inputClass + "__field";
      this.wrapper.appendChild(this.minusBtn);
      this.wrapper.appendChild(this.inputElement);
      this.wrapper.appendChild(this.plusBtn);
      parent.appendChild(this.wrapper);
      return this;
    }

    setInputValue(value: number | string): PlusMinusInput {
      value = (typeof value == "string") ? value : value.toString();
      this.inputElement.value = value;
      this.inputElement.setAttribute("value", value);
      return this;
    }

    setupEventListeners(): PlusMinusInput {
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

    minusOnClick(event: Event): void {
      let value: number = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        value = ((value - this.options.increment) > this.options.minValue) ? (value - this.options.increment) : this.options.minValue;
      }
      else {
        value = this.options.defaultValue;
      }
      this.setInputValue(value);
    }

    minusOnMousedown(event: Event): void {
      let value: number;
      let oldValue: number = parseInt(this.inputElement.value);
      let increment: number = this.options.increment;
      this.holdTimerId = setTimeout(() => {
        this.incrementTimerId = setInterval(() => {
          value = parseInt(this.inputElement.value);
          if ((value - increment) > this.options.minValue) {
            value -= increment;
            if ((oldValue - value) > (increment * 30)) {
              increment *= 11;
            }
          }
          else {
            value = this.options.minValue;
          }
          this.setInputValue(value);
        }, this.options.incrementDelay);
      }, this.options.holdDelay);
    }

    plusOnClick(event: Event): void {
      let value: number = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        value = ((value + this.options.increment) < this.options.maxValue) ? (value + this.options.increment) : this.options.maxValue;
      }
      else {
        value = this.options.defaultValue;
      }
      this.setInputValue(value);
    }

    plusOnMousedown(event: Event): void {
      let oldValue: number = parseInt(this.inputElement.value);
      let increment: number = this.options.increment;
      this.holdTimerId = setTimeout(() => {
        this.incrementTimerId = setInterval(() => {
          let value: number = parseInt(this.inputElement.value);
          if ((value + increment) < this.options.maxValue) {
            value += increment;
            if ((value - oldValue) > (increment * 30)) {
              increment *= 11;
            }
          }
          else {
            value = this.options.maxValue;
          }
          this.setInputValue(value);
        }, this.options.incrementDelay);
      }, this.options.holdDelay);
    }

    inputOnInput(event: Event): void {
      let value: number = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        if (value > this.options.maxValue) value = this.options.maxValue;
        if (value < this.options.minValue) value = this.options.minValue;
      }
      else {
        value = this.options.defaultValue;
      }
      this.setInputValue(value);
    }

    clearTimers(): void {
      if (this.incrementTimerId) { clearInterval(this.incrementTimerId); }
      if (this.holdTimerId) { clearTimeout(this.holdTimerId); }
    }
  }

  // -------------------------------------------------------------------------------------------------------

  return function plusMinusInputFactory(options: PlusMinusInputOptions): void {

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
    const opts = mergeOptions(defaultOptions, options);

    let elements: NodeListOf<HTMLInputElement>;

    try {
      elements = document.querySelectorAll("." + opts.inputClass);
    }
    catch (error) {
      console.warn("PlusMinusInput >> Please enter a valid inputClass. " + error);
      return;
    }

    if (elements.length === 0) {
      console.warn("PlusMinusInput >> Your collection has 0 elements. Check your inputClass.");
      return;
    }

    if (opts.defaultValue < opts.minValue || opts.defaultValue > opts.maxValue) {
      console.warn("PlusMinusInput >> Default value of input must be more than minValue and less than maxValue");
    }

    if (opts.minValue > opts.maxValue) {
      console.warn("PlusMinusInput >> minValue of input must be less than maxValue");
    }

    for (let i = 0, len = elements.length; i < len; i++) {
      new PlusMinusInput(elements[i], opts).init();
    }
  }
  // -------------------------------------------------------------------------------------------------------

})();