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
var inputCounter = (function () {
    // -------------------------------------------------------------------------------------------------------
    var InputCounter = /** @class */ (function () {
        function InputCounter(inputElement, options) {
            this.inputElement = inputElement;
            this.options = options;
            this.wheelDelta = 0;
            this.oldDelta = 0;
        }
        InputCounter.prototype.init = function () {
            if (this.options.minValue > this.options.maxValue)
                this.options.minValue = this.options.maxValue;
            if (this.options.defaultValue < this.options.minValue)
                this.options.defaultValue = this.options.minValue;
            if (this.options.defaultValue > this.options.maxValue)
                this.options.defaultValue = this.options.maxValue;
            this.render().setupEventListeners().setInputValue(this.options.defaultValue);
        };
        InputCounter.prototype.render = function () {
            this.wrapper = document.createElement('div');
            this.plusBtn = document.createElement('span');
            this.minusBtn = document.createElement('span');
            var parent = this.inputElement.parentNode;
            this.wrapper.className = this.options.inputClass;
            this.minusBtn.className = this.options.inputClass + '__minus';
            this.minusBtn.innerHTML = this.options.minusContent;
            this.plusBtn.className = this.options.inputClass + '__plus';
            this.plusBtn.innerHTML = this.options.plusContent;
            this.inputElement.className = this.options.inputClass + '__field';
            this.wrapper.appendChild(this.minusBtn);
            this.wrapper.appendChild(this.inputElement);
            this.wrapper.appendChild(this.plusBtn);
            parent.appendChild(this.wrapper);
            return this;
        };
        InputCounter.prototype.setInputValue = function (value) {
            value = (typeof value == 'string') ? value : value.toString();
            this.inputElement.value = value;
            this.inputElement.setAttribute('value', value);
            return this;
        };
        InputCounter.prototype.setupEventListeners = function () {
            var _this = this;
            this.minusBtn.addEventListener('click', function () { return _this.decrement(); });
            this.plusBtn.addEventListener('click', function () { return _this.increment(); });
            this.inputElement.addEventListener('input', function () { return _this.inputHandler(); });
            this.inputElement.addEventListener('wheel', function (event) { return _this.wheelHandler(event); });
            return this;
        };
        InputCounter.prototype.increment = function () {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                value = ((value + this.options.increment) < this.options.maxValue) ? (value + this.options.increment) : this.options.maxValue;
            }
            else {
                value = this.options.defaultValue;
            }
            this.setInputValue(value);
        };
        InputCounter.prototype.decrement = function () {
            var value = parseInt(this.inputElement.value);
            if (!isNaN(value)) {
                value = ((value - this.options.increment) > this.options.minValue) ? (value - this.options.increment) : this.options.minValue;
            }
            else {
                value = this.options.defaultValue;
            }
            this.setInputValue(value);
        };
        InputCounter.prototype.inputHandler = function () {
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
        InputCounter.prototype.wheelHandler = function (event) {
            var value = parseInt(this.inputElement.value);
            this.wheelDelta += event.deltaY;
            if (this.wheelDelta > this.oldDelta) {
                // decrement
                this.decrement();
            }
            ;
            if (this.wheelDelta < this.oldDelta) {
                // increment
                this.increment();
            }
            this.oldDelta = this.wheelDelta;
        };
        return InputCounter;
    }());
    // -------------------------------------------------------------------------------------------------------
    return function inputCounterFactory(options) {
        if (options === void 0) { options = {}; }
        var defaultOptions = {
            inputClass: 'input-counter',
            defaultValue: 1,
            minValue: 0,
            maxValue: 1000,
            increment: 1,
            minusContent: '&minus;',
            plusContent: '&plus;'
        };
        var opts = __assign({}, defaultOptions, options);
        var elements;
        try {
            elements = document.querySelectorAll('.' + opts.inputClass);
        }
        catch (error) {
            console.warn('PlusMinusInput >> Please enter a valid inputClass. ' + error);
            return;
        }
        if (elements.length === 0) {
            console.warn('PlusMinusInput >> Your collection has 0 elements. Check your inputClass.');
            return;
        }
        if (opts.defaultValue < opts.minValue || opts.defaultValue > opts.maxValue) {
            console.warn('PlusMinusInput >> Default value of input must be more than minValue and less than maxValue');
        }
        if (opts.minValue > opts.maxValue) {
            console.warn('PlusMinusInput >> minValue of input must be less than maxValue');
        }
        for (var i = 0, len = elements.length; i < len; i++) {
            new InputCounter(elements[i], opts).init();
        }
    };
    // -------------------------------------------------------------------------------------------------------
})();
