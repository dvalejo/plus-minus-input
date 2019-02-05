var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var pmInput = (function () {
    // -------------------------------------------------------------------------------------------------------
    var PlusMinusInput = /** @class */ (function () {
        function PlusMinusInput(inputElement, options) {
            this.inputElement = inputElement;
            this.options = options;
        }
        PlusMinusInput.prototype.init = function () {
            if (this.options.minValue > this.options.maxValue)
                this.options.minValue = this.options.maxValue;
            if (this.options.defaultValue < this.options.minValue)
                this.options.defaultValue = this.options.minValue;
            if (this.options.defaultValue > this.options.maxValue)
                this.options.defaultValue = this.options.maxValue;
            this.render().setupEventListeners().setInputValue(this.options.defaultValue);
        };
        PlusMinusInput.prototype.render = function () {
            this.wrapper = document.createElement("div");
            this.plusBtn = document.createElement("span");
            this.minusBtn = document.createElement("span");
            var parent = this.inputElement.parentNode;
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
        };
        PlusMinusInput.prototype.setInputValue = function (value) {
            value = (typeof value == "string") ? value : value.toString();
            this.inputElement.value = value;
            this.inputElement.setAttribute("value", value);
            return this;
        };
        PlusMinusInput.prototype.setupEventListeners = function () {
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
                value = ((value - this.options.increment) > this.options.minValue) ? (value - this.options.increment) : this.options.minValue;
            }
            else {
                value = this.options.defaultValue;
            }
            this.setInputValue(value);
        };
        PlusMinusInput.prototype.minusOnMousedown = function (event) {
            var _this = this;
            var startValue = parseInt(this.inputElement.value);
            var increment = this.options.increment;
            var value;
            this.holdTimerId = setTimeout(function () {
                _this.incrementTimerId = setInterval(function () {
                    value = parseInt(_this.inputElement.value);
                    if ((value - increment) > _this.options.minValue) {
                        value -= increment;
                        if ((startValue - value) > (increment * 20)) {
                            increment *= 2;
                        }
                    }
                    else {
                        value = _this.options.minValue;
                    }
                    _this.setInputValue(value);
                }, _this.options.incrementDelay);
            }, this.options.holdDelay);
        };
        PlusMinusInput.prototype.plusOnClick = function (event) {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                value = ((value + this.options.increment) < this.options.maxValue) ? (value + this.options.increment) : this.options.maxValue;
            }
            else {
                value = this.options.defaultValue;
            }
            this.setInputValue(value);
        };
        PlusMinusInput.prototype.plusOnMousedown = function (event) {
            var _this = this;
            var startValue = parseInt(this.inputElement.value);
            var increment = this.options.increment;
            var value;
            this.holdTimerId = setTimeout(function () {
                _this.incrementTimerId = setInterval(function () {
                    value = parseInt(_this.inputElement.value);
                    if ((value + increment) < _this.options.maxValue) {
                        value += increment;
                        if ((value - startValue) > (increment * 20)) {
                            increment *= 2;
                        }
                    }
                    else {
                        value = _this.options.maxValue;
                    }
                    _this.setInputValue(value);
                }, _this.options.incrementDelay);
            }, this.options.holdDelay);
        };
        PlusMinusInput.prototype.inputOnInput = function (event) {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                if (value > this.options.maxValue)
                    value = this.options.maxValue;
                if (value < this.options.minValue)
                    value = this.options.minValue;
            }
            else {
                value = this.options.defaultValue;
            }
            this.setInputValue(value);
        };
        PlusMinusInput.prototype.clearTimers = function () {
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
        if (options === void 0) { options = {}; }
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
        var opts = __assign({}, defaultOptions, options);
        var elements;
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
        for (var i = 0, len = elements.length; i < len; i++) {
            new PlusMinusInput(elements[i], opts).init();
        }
    };
    // -------------------------------------------------------------------------------------------------------
})();
