// -------------------------------------------------------------------------------------------------------
interface PlusMinusInputOptions {
  inputClass?: string;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  increment?: number;
  holdDelay?: number;
  incrementDelay?: number;
}
// -------------------------------------------------------------------------------------------------------
class PlusMinusInput {

  private holdTimerId: number;
  private incrementTimerId: number;

  constructor(
    private inputElement: HTMLInputElement,
    private inputClass: string,
    private defaultValue: number,
    private minValue: number,
    private maxValue: number,
    private increment: number,
    private holdDelay: number,
    private incrementDelay: number,
  ) { }

  render(): void {
    let wrapper: HTMLElement = document.createElement("div");
    let plusBtn: HTMLElement = document.createElement("span");
    let minusBtn: HTMLElement = document.createElement("span");
    let parent: Node = this.inputElement.parentNode;

    wrapper.className = this.inputClass;
    minusBtn.className = this.inputClass + "__minus";
    minusBtn.innerHTML = "&minus;";
    minusBtn.addEventListener("click", event => this.minusOnClick(event));
    minusBtn.addEventListener("mousedown", event => this.minusOnMousedown(event));
    minusBtn.addEventListener("mouseup", () => this.clearTimers());
    minusBtn.addEventListener("mouseout", () => this.clearTimers());
    plusBtn.className = this.inputClass + "__plus";
    plusBtn.innerHTML = "&plus;";
    plusBtn.addEventListener("click", event => this.plusOnClick(event));
    plusBtn.addEventListener("mousedown", event => this.plusOnMousedown(event));
    plusBtn.addEventListener("mouseup", () => this.clearTimers());
    plusBtn.addEventListener("mouseout", () => this.clearTimers());
    this.inputElement.className = this.inputClass + "__field";
    this.inputElement.addEventListener("input", event => this.inputOnInput(event));

    if (this.minValue > this.maxValue) this.minValue = this.maxValue;
    if (this.defaultValue < this.minValue) this.defaultValue = this.minValue;
    if (this.defaultValue > this.maxValue) this.defaultValue = this.maxValue;

    this.inputElement.value = this.defaultValue.toString();
    this.inputElement.setAttribute("value", this.inputElement.value);

    wrapper.appendChild(minusBtn);
    wrapper.appendChild(this.inputElement);
    wrapper.appendChild(plusBtn);
    parent.appendChild(wrapper);
  }

  minusOnClick(event: Event): void {
    let value: number = parseInt(this.inputElement.value);
    if (!isNaN(value)) {
      value = (value > this.minValue) ? (value - this.increment) : this.minValue;
    }
    else {
      value = this.defaultValue;
    }
    this.inputElement.value = value.toString();
    this.inputElement.setAttribute("value", this.inputElement.value);
  }

  minusOnMousedown(event: Event): void {
    let value: number;
    let oldValue: number = parseInt(this.inputElement.value);
    let increment: number = this.increment;
    this.holdTimerId = setTimeout(() => {
      this.incrementTimerId = setInterval(() => {
        value = parseInt(this.inputElement.value);
        if (value > (this.minValue + increment)) {
          value -= increment;
          if ((oldValue - value) > (increment * 50)) {
            increment *= 11;
          }
        }
        else {
          value = this.minValue;
        }
        this.inputElement.value = value.toString();
      }, this.incrementDelay);
    }, this.holdDelay);
  }

  plusOnClick(event: Event): void {
    let value: number = parseInt(this.inputElement.value);
    if (!isNaN(value)) {
      value = (value < this.maxValue) ? (value + this.increment) : this.maxValue;
    }
    else {
      value = this.defaultValue;
    }
    this.inputElement.value = value.toString();
    this.inputElement.setAttribute("value", this.inputElement.value);
  }

  plusOnMousedown(event: Event): void {
    let value: number;
    let oldValue: number = parseInt(this.inputElement.value);
    let increment: number = this.increment;
    this.holdTimerId = setTimeout(() => {
      this.incrementTimerId = setInterval(() => {
        value = parseInt(this.inputElement.value);
        if ((value + increment) < this.maxValue) {
          value += increment;
          if ((value - oldValue) > (increment * 50)) {
            increment *= 11;
          }
        }
        else {
          value = this.maxValue;
        }
        this.inputElement.value = value.toString();
      }, this.incrementDelay);
    }, this.holdDelay);
  }

  inputOnInput(event: Event): void {
    let value: number = parseInt(this.inputElement.value);
    if (!isNaN(value)) {
      if (value > this.maxValue) value = this.maxValue;
      if (value < this.minValue) value = this.minValue;
    }
    else {
      value = this.defaultValue;
    }
    this.inputElement.value = value.toString();
    this.inputElement.setAttribute("value", this.inputElement.value);
  }

  clearTimers(): void {
    this.inputElement.setAttribute("value", this.inputElement.value);
    if (this.incrementTimerId) { clearInterval(this.incrementTimerId); }
    if (this.holdTimerId) { clearTimeout(this.holdTimerId); }
  }
}
// -------------------------------------------------------------------------------------------------------
export default function plusMinusInputFactory(options: PlusMinusInputOptions): void {

  let inputClass: string = options.inputClass || "plus-minus-input";
  let defaultValue: number = options.defaultValue || 1;
  let minValue: number = options.minValue || 0;
  let maxValue: number = options.maxValue || 1000;
  let increment: number = options.increment || 1;
  let holdDelay: number = options.holdDelay || 500;
  let incrementDelay: number = options.incrementDelay || 50;

  let elements: NodeListOf<HTMLInputElement>;

  try {
    elements = document.querySelectorAll("." + inputClass);
  }
  catch (error) {
    console.warn("PlusMinusInput >> Please enter a valid selector. " + error);
    return;
  }

  if (elements.length === 0) {
    console.warn("PlusMinusInput >> Your collection has 0 elements. Maybe your selector is invalid.");
    return;
  }

  if (defaultValue < minValue || defaultValue > maxValue) {
    console.warn("PlusMinusInput >> Default value of input must be more than minValue and less than maxValue");
  }

  if (minValue > maxValue) {
    console.warn("PlusMinusInput >> minValue of input must be less than maxValue");
  }

  for (let i = 0, len = elements.length; i < len; i++) {
    new PlusMinusInput(
      elements[i],
      inputClass,
      defaultValue,
      minValue,
      maxValue,
      increment,
      holdDelay,
      incrementDelay,
    ).render();
  }
}
// -------------------------------------------------------------------------------------------------------
import "./plus-minus-input.css";
// -------------------------------------------------------------------------------------------------------