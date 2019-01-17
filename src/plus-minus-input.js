var pmInput = (function () {
    // -------------------------------------------------------------------------------------------------------
    var PlusMinusInput = /** @class */ (function () {
        function PlusMinusInput(inputElement, inputClass, defaultValue, minValue, maxValue, increment, holdDelay, incrementDelay, minusContent, plusContent) {
            this.inputElement = inputElement;
            this.inputClass = inputClass;
            this.defaultValue = defaultValue;
            this.minValue = minValue;
            this.maxValue = maxValue;
            this.increment = increment;
            this.holdDelay = holdDelay;
            this.incrementDelay = incrementDelay;
            this.minusContent = minusContent;
            this.plusContent = plusContent;
        }
        PlusMinusInput.prototype.render = function () {
            var _this = this;
            var wrapper = document.createElement("div");
            var plusBtn = document.createElement("span");
            var minusBtn = document.createElement("span");
            var parent = this.inputElement.parentNode;
            wrapper.className = this.inputClass;
            minusBtn.className = this.inputClass + "__minus";
            minusBtn.innerHTML = this.minusContent;
            minusBtn.addEventListener("click", function (event) { return _this.minusOnClick(event); });
            minusBtn.addEventListener("mousedown", function (event) { return _this.minusOnMousedown(event); });
            minusBtn.addEventListener("mouseup", function () { return _this.clearTimers(); });
            minusBtn.addEventListener("mouseout", function () { return _this.clearTimers(); });
            plusBtn.className = this.inputClass + "__plus";
            plusBtn.innerHTML = this.plusContent;
            plusBtn.addEventListener("click", function (event) { return _this.plusOnClick(event); });
            plusBtn.addEventListener("mousedown", function (event) { return _this.plusOnMousedown(event); });
            plusBtn.addEventListener("mouseup", function () { return _this.clearTimers(); });
            plusBtn.addEventListener("mouseout", function () { return _this.clearTimers(); });
            this.inputElement.className = this.inputClass + "__field";
            this.inputElement.addEventListener("input", function (event) { return _this.inputOnInput(event); });
            if (this.minValue > this.maxValue)
                this.minValue = this.maxValue;
            if (this.defaultValue < this.minValue)
                this.defaultValue = this.minValue;
            if (this.defaultValue > this.maxValue)
                this.defaultValue = this.maxValue;
            this.inputElement.value = this.defaultValue.toString();
            this.inputElement.setAttribute("value", this.inputElement.value);
            wrapper.appendChild(minusBtn);
            wrapper.appendChild(this.inputElement);
            wrapper.appendChild(plusBtn);
            parent.appendChild(wrapper);
        };
        PlusMinusInput.prototype.minusOnClick = function (event) {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                value = ((value - this.increment) > this.minValue) ? (value - this.increment) : this.minValue;
            }
            else {
                value = this.defaultValue;
            }
            this.inputElement.value = value.toString();
            this.inputElement.setAttribute("value", this.inputElement.value);
        };
        PlusMinusInput.prototype.minusOnMousedown = function (event) {
            var _this = this;
            var value;
            var oldValue = parseInt(this.inputElement.value);
            var increment = this.increment;
            this.holdTimerId = setTimeout(function () {
                _this.incrementTimerId = setInterval(function () {
                    value = parseInt(_this.inputElement.value);
                    if ((value - increment) > _this.minValue) {
                        value -= increment;
                        if ((oldValue - value) > (increment * 30)) {
                            increment *= 11;
                        }
                    }
                    else {
                        value = _this.minValue;
                    }
                    _this.inputElement.value = value.toString();
                }, _this.incrementDelay);
            }, this.holdDelay);
        };
        PlusMinusInput.prototype.plusOnClick = function (event) {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                value = ((value + this.increment) < this.maxValue) ? (value + this.increment) : this.maxValue;
            }
            else {
                value = this.defaultValue;
            }
            this.inputElement.value = value.toString();
            this.inputElement.setAttribute("value", this.inputElement.value);
        };
        PlusMinusInput.prototype.plusOnMousedown = function (event) {
            var _this = this;
            var value;
            var oldValue = parseInt(this.inputElement.value);
            var increment = this.increment;
            this.holdTimerId = setTimeout(function () {
                _this.incrementTimerId = setInterval(function () {
                    value = parseInt(_this.inputElement.value);
                    if ((value + increment) < _this.maxValue) {
                        value += increment;
                        if ((value - oldValue) > (increment * 30)) {
                            increment *= 11;
                        }
                    }
                    else {
                        value = _this.maxValue;
                    }
                    _this.inputElement.value = value.toString();
                }, _this.incrementDelay);
            }, this.holdDelay);
        };
        PlusMinusInput.prototype.inputOnInput = function (event) {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                if (value > this.maxValue)
                    value = this.maxValue;
                if (value < this.minValue)
                    value = this.minValue;
            }
            else {
                value = this.defaultValue;
            }
            this.inputElement.value = value.toString();
            this.inputElement.setAttribute("value", this.inputElement.value);
        };
        PlusMinusInput.prototype.clearTimers = function () {
            this.inputElement.setAttribute("value", this.inputElement.value);
            if (this.incrementTimerId) {
                clearInterval(this.incrementTimerId);
            }
            if (this.holdTimerId) {
                clearTimeout(this.holdTimerId);
            }
        };
        return PlusMinusInput;
    }());
    // -------------------------------------------------------------------------------------------------------
    return function plusMinusInputFactory(options) {
        var inputClass = options.inputClass || "plus-minus-input";
        var defaultValue = options.defaultValue || 1;
        var minValue = options.minValue || 0;
        var maxValue = options.maxValue || 1000;
        var increment = options.increment || 1;
        var holdDelay = options.holdDelay || 500;
        var incrementDelay = options.incrementDelay || 50;
        var minusContent = options.minusContent || "&minus;";
        var plusContent = options.plusContent || "&plus;";
        var elements;
        try {
            elements = document.querySelectorAll("." + inputClass);
        }
        catch (error) {
            console.warn("PlusMinusInput >> Please enter a valid inputClass. " + error);
            return;
        }
        if (elements.length === 0) {
            console.warn("PlusMinusInput >> Your collection has 0 elements. Check your inputClass.");
            return;
        }
        if (defaultValue < minValue || defaultValue > maxValue) {
            console.warn("PlusMinusInput >> Default value of input must be more than minValue and less than maxValue");
        }
        if (minValue > maxValue) {
            console.warn("PlusMinusInput >> minValue of input must be less than maxValue");
        }
        for (var i = 0, len = elements.length; i < len; i++) {
            new PlusMinusInput(elements[i], inputClass, defaultValue, minValue, maxValue, increment, holdDelay, incrementDelay, minusContent, plusContent).render();
        }
    };
    console.log("bla");
    // -------------------------------------------------------------------------------------------------------
})();
