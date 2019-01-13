const PlusMinusInput = (function () {

  let counterClass = "input-counter";
  let counterDefaultValue = 1;
  let counterIncrement = 1;
  let holdDelay = 500;
  let incrementDelay = 50;

  function Counter(input) {
    this.inputElement = input;
    this.holdTimer;
    this.incrementTimer;
  }

  Counter.prototype.render = function () {
    let wrapper = document.createElement("div");
    let plusBtn = document.createElement("span");
    let minusBtn = document.createElement("span");
    let parent = this.inputElement.parentNode;

    wrapper.classList.add(counterClass);
    minusBtn.classList.add(counterClass + "__minus");
    minusBtn.innerHTML = "&minus;";
    minusBtn.addEventListener("click", this.minusOnClick.bind(this));
    minusBtn.addEventListener("mousedown", this.minusOnMousedown.bind(this));
    minusBtn.addEventListener("mouseup", this.clearTimers.bind(this));
    minusBtn.addEventListener("mouseout", this.clearTimers.bind(this));
    plusBtn.classList.add(counterClass + "__plus");
    plusBtn.innerHTML = "&plus;";
    plusBtn.addEventListener("click", this.plusOnClick.bind(this));
    plusBtn.addEventListener("mousedown", this.plusOnMousedown.bind(this));
    plusBtn.addEventListener("mouseup", this.clearTimers.bind(this));
    plusBtn.addEventListener("mouseout", this.clearTimers.bind(this));
    this.inputElement.classList.remove(counterClass);
    this.inputElement.classList.add(counterClass + "__field");
    this.inputElement.addEventListener("input", this.inputOnInput.bind(this));
    this.inputElement.setAttribute("value", counterDefaultValue);

    wrapper.appendChild(minusBtn);
    wrapper.appendChild(this.inputElement);
    wrapper.appendChild(plusBtn);
    parent.appendChild(wrapper);
  }

  Counter.prototype.minusOnClick = function () {
    let value = parseInt(this.inputElement.value);
    if (!isNaN(value)) {
      if (value > counterIncrement) this.inputElement.value = value - counterIncrement;
    }
    else {
      this.inputElement.value = counterDefaultValue;
    }
    this.inputElement.setAttribute("value", this.inputElement.value);
  }

  Counter.prototype.minusOnMousedown = function () {
    let value;
    this.holdTimer = setTimeout(() => {
      this.incrementTimer = setInterval(() => {
        value = parseInt(this.inputElement.value);
        if (this.inputElement.value > counterIncrement) this.inputElement.value = value - counterIncrement;
      }, incrementDelay);
    }, holdDelay);
  }

  Counter.prototype.plusOnClick = function (e) {
    let value = parseInt(this.inputElement.value);
    if (!isNaN(value)) {
      this.inputElement.value = value + counterIncrement;
    }
    else {
      this.inputElement.value = counterDefaultValue;
    }
    this.inputElement.setAttribute("value", this.inputElement.value);
  }

  Counter.prototype.plusOnMousedown = function () {
    let value;
    let oldValue = parseInt(this.inputElement.value);
    let increment = counterIncrement;
    this.holdTimer = setTimeout(() => {
      this.incrementTimer = setInterval(() => {
        value = parseInt(this.inputElement.value);
        this.inputElement.value = value + increment;
        if ((value - oldValue) > (increment * 50)) {
          console.log(value, oldValue);
          increment *= 2;
        }
      }, incrementDelay);
    }, holdDelay);
  }

  Counter.prototype.inputOnInput = function () {
    this.inputElement.setAttribute("value", this.inputElement.value);
  }

  Counter.prototype.clearTimers = function () {
    this.inputElement.setAttribute("value", this.inputElement.value);
    if (this.incrementTimer) { clearInterval(this.incrementTimer); }
    if (this.holdTimer) { clearTimeout(this.holdTimer); }
  }

  return {
    init: function (options) {
      let elements;
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