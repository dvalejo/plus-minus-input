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
    // --------------------------------------------------------------------------------------
    var InputCounter = /** @class */ (function () {
        function InputCounter(inputElement, options) {
            this.inputElement = inputElement;
            this.options = options;
            this.disabled = false;
            this.attributes = ['max-value', 'min-value', 'increment'];
            this.baseClass = 'input-counter';
        }
        InputCounter.prototype.init = function () {
            var _this = this;
            // process ['max-value', 'min-value', 'increment'] attributes
            this.attributes.forEach(function (attrName) {
                var attrVal = parseInt(_this.inputElement.getAttribute(attrName));
                if (!isNaN(attrVal)) {
                    _this.options[_this.toCamelCase(attrName)] = attrVal;
                    _this.inputElement.removeAttribute(attrName);
                }
            });
            // process value attribute
            var attrValue = parseInt(this.inputElement.getAttribute('value'));
            !isNaN(attrValue) ? this.setInputValue(attrValue) : this.setInputValue(this.options.defaultValue);
            // process disabled attribute
            this.disabled = (this.inputElement.getAttribute('disabled') !== null) ? true : false;
            this.render();
            if (!this.disabled) {
                this.setupEventListeners();
            }
        };
        InputCounter.prototype.render = function () {
            this.wrapper = document.createElement('div');
            this.plusBtn = document.createElement('span');
            this.minusBtn = document.createElement('span');
            var parent = this.inputElement.parentNode;
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
        };
        InputCounter.prototype.setInputValue = function (value) {
            this.inputElement.value = value.toString();
            this.inputElement.setAttribute('value', value.toString());
        };
        InputCounter.prototype.getInputValue = function () {
            if (this.inputElement.value === '')
                return 0;
            var value = parseInt(this.inputElement.value);
            return !isNaN(value)
                ? value
                : this.options.defaultValue;
        };
        InputCounter.prototype.toCamelCase = function (attrName) {
            var arr = attrName.split('-');
            if (arr.length === 1)
                return attrName;
            return arr.reduce(function (acc, curr, index) {
                if (index > 0) {
                    curr = curr.charAt(0).toLocaleUpperCase() + curr.substring(1);
                }
                return acc += curr;
            });
        };
        InputCounter.prototype.setupEventListeners = function () {
            var _this = this;
            this.minusBtn.addEventListener('click', function () { return _this.operation('-'); });
            this.plusBtn.addEventListener('click', function () { return _this.operation('+'); });
            this.inputElement.addEventListener('input', function () { return _this.inputHandler(); });
            this.inputElement.addEventListener('wheel', function (event) { return _this.wheelHandler(event); });
        };
        InputCounter.prototype.operation = function (type) {
            var value = this.getInputValue();
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
        };
        InputCounter.prototype.inputHandler = function () {
            var value = this.getInputValue();
            if (value > this.options.maxValue)
                value = this.options.maxValue;
            if (value < this.options.minValue)
                value = this.options.minValue;
            this.setInputValue(value);
        };
        InputCounter.prototype.wheelHandler = function (event) {
            event.preventDefault();
            if (event.deltaY > 0)
                this.operation('-');
            if (event.deltaY < 0)
                this.operation('+');
        };
        return InputCounter;
    }());
    // --------------------------------------------------------------------------------------
    return function inputCounterFactory(options) {
        if (options === void 0) { options = {}; }
        var defaultOptions = {
            selector: '',
            defaultValue: 1,
            minValue: 0,
            maxValue: 1000,
            increment: 1
        };
        var opts = __assign(__assign({}, defaultOptions), options);
        var elements;
        try {
            elements = document.querySelectorAll(opts.selector);
        }
        catch (error) {
            console.warn('InputCounter >> Please enter a valid selector. ' + error);
            return;
        }
        if (elements.length > 0) {
            for (var i = 0, len = elements.length; i < len; i++) {
                new InputCounter(elements[i], opts).init();
            }
        }
    };
    // --------------------------------------------------------------------------------------
})();
