const inputCounter = (function () {

  // --------------------------------------------------------------------------------------
  interface InputCounterOptions {
    inputClass: string;
    defaultValue: number;
    minValue: number;
    maxValue: number;
    increment: number;
    [key: string]: string | number;
  }

  // --------------------------------------------------------------------------------------
  class InputCounter {

    private wrapper: HTMLElement;
    private minusBtn: HTMLElement;
    private plusBtn: HTMLElement;
    private wheelDelta: number = 0;
    private oldDelta: number = 0;

    constructor(
      private inputElement: HTMLInputElement,
      private options: InputCounterOptions
    ) { }

    init(): void {
      if (this.options.minValue > this.options.maxValue) this.options.minValue = this.options.maxValue;
      if (this.options.defaultValue < this.options.minValue) this.options.defaultValue = this.options.minValue;
      if (this.options.defaultValue > this.options.maxValue) this.options.defaultValue = this.options.maxValue;
      this.render().setupEventListeners().setInputValue(this.options.defaultValue);
    }

    render(): InputCounter {
      this.wrapper = document.createElement('div');
      this.plusBtn = document.createElement('span');
      this.minusBtn = document.createElement('span');
      const parent: Node = this.inputElement.parentNode;

      this.wrapper.className = this.options.inputClass;
      this.minusBtn.className = this.options.inputClass + '__minus';
      this.minusBtn.innerHTML = '−';
      this.plusBtn.className = this.options.inputClass + '__plus';
      this.plusBtn.innerHTML = '+';
      this.inputElement.className = this.options.inputClass + '__field';
      this.wrapper.appendChild(this.minusBtn);
      this.wrapper.appendChild(this.inputElement);
      this.wrapper.appendChild(this.plusBtn);
      parent.appendChild(this.wrapper);
      return this;
    }

    setInputValue(value: number | string): InputCounter {
      value = (typeof value == 'string') ? value : value.toString();
      this.inputElement.value = value;
      this.inputElement.setAttribute('value', value);
      return this;
    }

    setupEventListeners(): InputCounter {
      this.minusBtn.addEventListener('click', () => this.decrement());
      this.plusBtn.addEventListener('click', () => this.increment());
      this.inputElement.addEventListener('input', () => this.inputHandler());
      this.inputElement.addEventListener('wheel', event => this.wheelHandler(event));
      return this;
    }

    increment(): void {
      let value: number = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        value = ((value + this.options.increment) < this.options.maxValue) ? (value + this.options.increment) : this.options.maxValue;
      }
      else {
        value = this.options.defaultValue;
      }
      this.setInputValue(value);
    }

    decrement(): void {
      let value: number = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        value = ((value - this.options.increment) > this.options.minValue) ? (value - this.options.increment) : this.options.minValue;
      }
      else {
        value = this.options.defaultValue;
      }
      this.setInputValue(value);
    }

    inputHandler(): void {
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

    wheelHandler(event: WheelEvent): void {
      event.preventDefault();
      let value: number = parseInt(this.inputElement.value);
      this.wheelDelta += event.deltaY;
      if (this.wheelDelta > this.oldDelta) {
        // decrement
        this.decrement();
      };
      if (this.wheelDelta < this.oldDelta) {
        // increment
        this.increment();
      }
      this.oldDelta = this.wheelDelta;
    }
  }

  // -------------------------------------------------------------------------------------------------------

  return function inputCounterFactory(options: Partial<InputCounterOptions> = {}): void {

    const defaultOptions: InputCounterOptions = {
      inputClass: 'input-counter',
      defaultValue: 1,
      minValue: 0,
      maxValue: 1000,
      increment: 1
    }
    const opts: InputCounterOptions = { ...defaultOptions, ...options };

    let elements: NodeListOf<HTMLInputElement>;

    try {
      elements = document.querySelectorAll('.' + opts.inputClass);
    }
    catch (error) {
      console.warn('InputCounter >> Please enter a valid inputClass. ' + error);
      return;
    }

    if (elements.length > 0) {

      if (opts.defaultValue < opts.minValue || opts.defaultValue > opts.maxValue) {
        console.warn('InputCounter >> Default value of input must be more than minValue and less than maxValue');
      }

      if (opts.minValue > opts.maxValue) {
        console.warn('InputCounter >> minValue of input must be less than maxValue');
      }

      for (let i = 0, len = elements.length; i < len; i++) {
        new InputCounter(elements[i], opts).init();
      }
    }
  }
  // -------------------------------------------------------------------------------------------------------

})();

