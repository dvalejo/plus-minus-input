const inputCounter = (function () {

  // --------------------------------------------------------------------------------------
  interface InputCounterOptions {
    selector: string,
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
    private disabled: boolean = false;
    private attributes: string[] = ['max-value', 'min-value', 'increment'];
    private baseClass: string = 'input-counter';

    constructor(
      private inputElement: HTMLInputElement,
      private options: InputCounterOptions
    ) { }

    init(): void {
      // process ['max-value', 'min-value', 'increment'] attributes
      this.attributes.forEach((attrName: string) => {
        const attrVal: number = parseInt(this.inputElement.getAttribute(attrName));
        if (!isNaN(attrVal)) {
          this.options[this.toCamelCase(attrName)] = attrVal;
          this.inputElement.removeAttribute(attrName);
        }
      });
      // process value attribute
      const attrValue: number = parseInt(this.inputElement.getAttribute('value'));
      !isNaN(attrValue) ? this.setInputValue(attrValue) : this.setInputValue(this.options.defaultValue);
      // process disabled attribute
      this.disabled = (this.inputElement.getAttribute('disabled') !== null) ? true : false;

      this.render();
      if (!this.disabled) {
        this.setupEventListeners();
      }
    }

    render(): void {
      this.wrapper = document.createElement('div');
      this.plusBtn = document.createElement('span');
      this.minusBtn = document.createElement('span');
      const parent: Node = this.inputElement.parentNode;

      this.wrapper.className = this.baseClass;
      this.minusBtn.className = this.baseClass + '__minus';
      this.minusBtn.innerHTML = '−';
      this.plusBtn.className = this.baseClass + '__plus';
      this.plusBtn.innerHTML = '+';
      this.inputElement.className = (this.inputElement.className + (' ' + this.baseClass + '__field')).trim();
      this.wrapper.appendChild(this.minusBtn);
      this.wrapper.appendChild(this.inputElement);
      this.wrapper.appendChild(this.plusBtn);
      parent.appendChild(this.wrapper);

      if (this.disabled) {
        this.wrapper.className += (' ' + this.baseClass + '--disabled');
      }
    }

    setInputValue(value: number | string): void {
      this.inputElement.value = value.toString();
      this.inputElement.setAttribute('value', value.toString());
    }

    getInputValue(): number {
      if (this.inputElement.value === '') return 0;
      const value: number = parseInt(this.inputElement.value);
      return !isNaN(value)
        ? value
        : this.options.defaultValue;
    }

    toCamelCase(attrName: string): string {
      const arr: string[] = attrName.split('-');
      if (arr.length === 1) return attrName;
      return arr.reduce((acc, curr, index): string => {
        if (index > 0) {
          curr = curr.charAt(0).toLocaleUpperCase() + curr.substring(1);
        }
        return acc += curr;
      });
    }

    setupEventListeners(): void {
      this.minusBtn.addEventListener('click', () => this.operation('-'));
      this.plusBtn.addEventListener('click', () => this.operation('+'));
      this.inputElement.addEventListener('input', () => this.inputHandler());
      this.inputElement.addEventListener('wheel', event => this.wheelHandler(event));
    }

    operation(type: string): void {
      let value: number = this.getInputValue();
      switch (type) {
        case '+':
          value = ((value + this.options.increment) < this.options.maxValue)
            ? (value + this.options.increment)
            : this.options.maxValue;
          break;
        case '-':
          value = ((value - this.options.increment) > this.options.minValue)
            ? (value - this.options.increment)
            : this.options.minValue;
          break;
        default:
          break;
      }
      this.setInputValue(value);
    }

    inputHandler(): void {
      let value: number = this.getInputValue();
      if (value > this.options.maxValue) value = this.options.maxValue;
      if (value < this.options.minValue) value = this.options.minValue;
      this.setInputValue(value);
    }

    wheelHandler(event: WheelEvent): void {
      event.preventDefault();
      if (event.deltaY > 0) this.operation('-');
      if (event.deltaY < 0) this.operation('+');
    }
  }

  // --------------------------------------------------------------------------------------

  return function inputCounterFactory(options: Partial<InputCounterOptions> = {}): void {

    const defaultOptions: InputCounterOptions = {
      selector: '',
      defaultValue: 1,
      minValue: 0,
      maxValue: 1000,
      increment: 1
    }
    const opts: InputCounterOptions = { ...defaultOptions, ...options };

    let elements: NodeListOf<HTMLInputElement>;
    try {
      elements = document.querySelectorAll(opts.selector);
    }
    catch (error) {
      console.warn('InputCounter >> Please enter a valid selector. ' + error);
      return;
    }

    if (elements.length > 0) {
      for (let i = 0, len = elements.length; i < len; i++) {
        new InputCounter(elements[i], opts).init();
      }
    }
  }
  // --------------------------------------------------------------------------------------

})();

