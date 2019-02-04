var pmInput__es6 = (function () {
    function mergeOptions(defOpts, opts) {
        var resultOpts = {};
        if ((typeof defOpts !== "object") || (typeof opts !== "object"))
            return;
        for (var key in defOpts) {
            resultOpts[key] = opts.hasOwnProperty(key) ? opts[key] : defOpts[key];
        }
        return resultOpts;
    }
    // -------------------------------------------------------------------------------------------------------
    var PlusMinusInput = /** @class */ (function () {
        function PlusMinusInput(inputElement, options) {
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
        PlusMinusInput.prototype.init = function () {
            if (this.minValue > this.maxValue)
                this.minValue = this.maxValue;
            if (this.defaultValue < this.minValue)
                this.defaultValue = this.minValue;
            if (this.defaultValue > this.maxValue)
                this.defaultValue = this.maxValue;
            this.render().setInputValue(this.defaultValue).attachEventListeners();
        };
        PlusMinusInput.prototype.setInputValue = function (value) {
            this.inputElement.value = value.toString();
            this.inputElement.setAttribute("value", this.inputElement.value);
            return this;
        };
        PlusMinusInput.prototype.render = function () {
            this.wrapper = document.createElement("div");
            this.plusBtn = document.createElement("span");
            this.minusBtn = document.createElement("span");
            var parent = this.inputElement.parentNode;
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
        };
        PlusMinusInput.prototype.attachEventListeners = function () {
            var _this = this;
            this.minusBtn.addEventListener("click", function (event) { return _this.minusOnClick(event); });
            this.minusBtn.addEventListener("mousedown", function (event) { return _this.minusOnMousedown(event); });
            this.minusBtn.addEventListener("mouseup", function () { return _this.clearTimers(); });
            this.minusBtn.addEventListener("mouseout", function () { return _this.clearTimers(); });
            this.plusBtn.addEventListener("click", function (event) { return _this.plusOnClick(event); });
            this.plusBtn.addEventListener("mousedown", function (event) { return _this.plusOnMousedown(event); });
            this.plusBtn.addEventListener("mouseup", function () { return _this.clearTimers(); });
            this.plusBtn.addEventListener("mouseout", function () { return _this.clearTimers(); });
            this.inputElement.addEventListener("input", function (event) { return _this.inputOnInput(event); });
            return this;
        };
        PlusMinusInput.prototype.minusOnClick = function (event) {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                value = ((value - this.increment) > this.minValue) ? (value - this.increment) : this.minValue;
            }
            else {
                value = this.defaultValue;
            }
            this.setInputValue(value);
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
                    _this.setInputValue(value);
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
            this.setInputValue(value);
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
                    _this.setInputValue(value);
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
            this.setInputValue(value);
        };
        PlusMinusInput.prototype.clearTimers = function (event) {
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
        var defaultOptions = {
            inputClass: "plus-minus-input",
            defaultValue: 1,
            minValue: 0,
            maxValue: 1000,
            increment: 1,
            holdDelay: 500,
            incrementDelay: 50,
            minusContent: "&minus;",
            plusContent: "&plus;"
        };
        var pmOptions = mergeOptions(defaultOptions, options);
        var elements;
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
        for (var i = 0, len = elements.length; i < len; i++) {
            new PlusMinusInput(elements[i], pmOptions).init();
        }
    };
    // -------------------------------------------------------------------------------------------------------
})();
