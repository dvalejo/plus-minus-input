const PlusMinusInput = (function () {

  let counterClass: string = "input-counter";
  let counterDefaultValue: number = 1;
  let counterIncrement: number = 1;
  let holdDelay: number = 500;
  let incrementDelay: number = 50;

  class Counter {
    private inputElement: HTMLInputElement;
    private holdTimer: number;
    private incrementTimer: number;

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
      minusBtn.addEventListener("click", this.minusOnClick.bind(this));
      minusBtn.addEventListener("mousedown", this.minusOnMousedown.bind(this));
      minusBtn.addEventListener("mouseup", this.clearTimers.bind(this));
      minusBtn.addEventListener("mouseout", this.clearTimers.bind(this));
      plusBtn.className = counterClass + "__plus";
      plusBtn.innerHTML = "&plus;";
      plusBtn.addEventListener("click", this.plusOnClick.bind(this));
      plusBtn.addEventListener("mousedown", this.plusOnMousedown.bind(this));
      plusBtn.addEventListener("mouseup", this.clearTimers.bind(this));
      plusBtn.addEventListener("mouseout", this.clearTimers.bind(this));
      this.inputElement.className = counterClass + "__field";
      this.inputElement.addEventListener("input", this.inputOnInput.bind(this));
      this.inputElement.setAttribute("value", counterDefaultValue.toString());

      wrapper.appendChild(minusBtn);
      wrapper.appendChild(this.inputElement);
      wrapper.appendChild(plusBtn);
      parent.appendChild(wrapper);
    }

    minusOnClick(e: Event): void {
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

    minusOnMousedown(e: Event): void {
      let value: number;
      let oldValue: number = parseInt(this.inputElement.value);
      let increment: number = counterIncrement;
      this.holdTimer = setTimeout(() => {
        this.incrementTimer = setInterval(() => {
          value = parseInt(this.inputElement.value);
          if (value > increment) {
            value -= increment;
            this.inputElement.value = value.toString();
            if ((oldValue - value) > (increment * 50)) {
              increment *= 11;
            }
          }
        }, incrementDelay);
      }, holdDelay);
    }

    plusOnClick(e: Event): void {
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

    plusOnMousedown(e: Event): void {
      let value: number;
      let oldValue: number = parseInt(this.inputElement.value);
      let increment: number = counterIncrement;
      this.holdTimer = setTimeout(() => {
        this.incrementTimer = setInterval(() => {
          value = parseInt(this.inputElement.value);
          value += increment;
          this.inputElement.value = value.toString();
          if ((value - oldValue) > (increment * 50)) {
            increment *= 11;
          }
        }, incrementDelay);
      }, holdDelay);
    }

    inputOnInput(e: Event): void {
      this.inputElement.setAttribute("value", this.inputElement.value);
    }

    clearTimers(): void {
      this.inputElement.setAttribute("value", this.inputElement.value);
      if (this.incrementTimer) { clearInterval(this.incrementTimer); }
      if (this.holdTimer) { clearTimeout(this.holdTimer); }
    }

  }

  console.log(Counter);

  return {
    init: function (options: any) {
      let elements: NodeListOf<HTMLInputElement>;
      let counter;
      counterClass = options.counterClass || counterClass;
      counterDefaultValue = options.defaultValue || counterDefaultValue;
      counterIncrement = options.counterIncrement || counterIncrement;
      holdDelay = options.holdDelay || holdDelay;
      incrementDelay = options.incrementDelay || incrementDelay;

      try {
        elements = document.querySelectorAll("." + counterClass);
      }
      catch (e) {
        console.warn("Please enter a valid selector. " + e);
        return;
      }
      if (elements.length === 0) return;

      for (let i = 0, len = elements.length; i < len; i++) {
        counter = new Counter(elements[i]);
        counter.render();
      }
    }
  }

})();

PlusMinusInput.init({
  counterClass: "",
  defaultValue: 1,
  counterIncrement: 1,
  holdDelay: 500,
  incrementDelay: 50
});