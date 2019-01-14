const PlusMinusInput = (function () {

  let counterClass: string = "input-counter";
  let counterDefaultValue: number = 1;
  let counterIncrement: number = 1;
  let holdDelay: number = 500;
  let incrementDelay: number = 50;

  interface CounterOptions {
    className?: string;
    defaultValue?: number;
    increment?: number;
    holdDelay?: number;
    incrementDelay?: number;
  }

  class Counter {
    private inputElement: HTMLInputElement;
    private holdTimerId: number;
    private incrementTimerId: number;

    constructor(input: HTMLInputElement) {
      this.inputElement = input;
    }

    render(): void {
      let wrapper: HTMLElement = document.createElement("div");
      let plusBtn: HTMLElement = document.createElement("span");
      let minusBtn: HTMLElement = document.createElement("span");
      let parent: Node = this.inputElement.parentNode;

      wrapper.className = counterClass;
      minusBtn.className = counterClass + "__minus";
      minusBtn.innerHTML = "&minus;";
      minusBtn.addEventListener("click", event => this.minusOnClick(event));
      minusBtn.addEventListener("mousedown", event => this.minusOnMousedown(event));
      minusBtn.addEventListener("mouseup", () => this.clearTimers());
      minusBtn.addEventListener("mouseout", () => this.clearTimers());
      plusBtn.className = counterClass + "__plus";
      plusBtn.innerHTML = "&plus;";
      plusBtn.addEventListener("click", event => this.plusOnClick(event));
      plusBtn.addEventListener("mousedown", event => this.plusOnMousedown(event));
      plusBtn.addEventListener("mouseup", () => this.clearTimers());
      plusBtn.addEventListener("mouseout", () => this.clearTimers());
      this.inputElement.className = counterClass + "__field";
      this.inputElement.addEventListener("input", event => this.inputOnInput(event));
      this.inputElement.setAttribute("value", counterDefaultValue.toString());

      wrapper.appendChild(minusBtn);
      wrapper.appendChild(this.inputElement);
      wrapper.appendChild(plusBtn);
      parent.appendChild(wrapper);
    }

    minusOnClick(event: Event): void {
      let value: number = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        if (value > counterIncrement) {
          value -= counterIncrement;
        }
      }
      else {
        value = counterDefaultValue;
      }
      this.inputElement.value = value.toString();
      this.inputElement.setAttribute("value", this.inputElement.value);
    }

    minusOnMousedown(event: Event): void {
      let value: number;
      let oldValue: number = parseInt(this.inputElement.value);
      let increment: number = counterIncrement;
      this.holdTimerId = setTimeout(() => {
        this.incrementTimerId = setInterval(() => {
          value = parseInt(this.inputElement.value);
          if (value > increment) {
            value -= increment;
            if ((oldValue - value) > (increment * 50)) {
              increment *= 11;
            }
          }
          else {
            value = counterDefaultValue;
          }
          this.inputElement.value = value.toString();
        }, incrementDelay);
      }, holdDelay);
    }

    plusOnClick(event: Event): void {
      let value: number = parseInt(this.inputElement.value);
      if (!isNaN(value)) {
        value += counterIncrement;
      }
      else {
        value = counterDefaultValue;
      }
      this.inputElement.value = value.toString();
      this.inputElement.setAttribute("value", this.inputElement.value);
    }

    plusOnMousedown(event: Event): void {
      let value: number;
      let oldValue: number = parseInt(this.inputElement.value);
      let increment: number = counterIncrement;
      this.holdTimerId = setTimeout(() => {
        this.incrementTimerId = setInterval(() => {
          value = parseInt(this.inputElement.value);
          value += increment;
          if ((value - oldValue) > (increment * 50)) {
            increment *= 11;
          }
          this.inputElement.value = value.toString();
        }, incrementDelay);
      }, holdDelay);
    }

    inputOnInput(event: Event): void {
      this.inputElement.setAttribute("value", this.inputElement.value);
    }

    clearTimers(): void {
      this.inputElement.setAttribute("value", this.inputElement.value);
      if (this.incrementTimerId) { clearInterval(this.incrementTimerId); }
      if (this.holdTimerId) { clearTimeout(this.holdTimerId); }
    }

  }

  return {
    init: function (options: CounterOptions): void {
      let elements: NodeListOf<HTMLInputElement>;
      counterClass = options.className || counterClass;
      counterDefaultValue = options.defaultValue || counterDefaultValue;
      counterIncrement = options.increment || counterIncrement;
      holdDelay = options.holdDelay || holdDelay;
      incrementDelay = options.incrementDelay || incrementDelay;

      try {
        elements = document.querySelectorAll("." + counterClass);
      }
      catch (error) {
        console.warn("Please enter a valid selector. " + error);
        return;
      }
      if (elements.length === 0) return;

      for (let i = 0, len = elements.length; i < len; i++) {
        new Counter(elements[i]).render();
      }
    }
  }

})();

PlusMinusInput.init({
  className: "",
  defaultValue: 1,
  increment: 1,
  holdDelay: 500,
  incrementDelay: 50
});