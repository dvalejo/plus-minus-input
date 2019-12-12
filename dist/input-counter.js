var MyControls =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
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
            this.plusBtn = document.createElement('button');
            this.minusBtn = document.createElement('button');
            var parent = this.inputElement.parentNode;
            this.wrapper.className = this.inputElement.className + ' ' + this.baseClass;
            this.minusBtn.setAttribute('type', 'button');
            this.minusBtn.className = this.baseClass + '__minus';
            this.minusBtn.innerHTML = '−';
            this.plusBtn.setAttribute('type', 'button');
            this.plusBtn.className = this.baseClass + '__plus';
            this.plusBtn.innerHTML = '+';
            this.inputElement.className = this.baseClass + '__field';
            this.wrapper.appendChild(this.minusBtn);
            this.wrapper.appendChild(this.inputElement);
            this.wrapper.appendChild(this.plusBtn);
            parent.appendChild(this.wrapper);
            if (this.disabled) {
                this.wrapper.className += (' ' + this.baseClass + '--disabled');
                this.plusBtn.setAttribute('disabled', 'disabled');
                this.minusBtn.setAttribute('disabled', 'disabled');
            }
        };
        InputCounter.prototype.checkMinusDisable = function () {
            var isPlusDisabled = this.plusBtn.getAttribute('disabled') !== null;
            if (isPlusDisabled)
                this.plusBtn.removeAttribute('disabled');
            if (this.getInputValue() == this.options.minValue) {
                this.minusBtn.setAttribute('disabled', 'disabled');
            }
        };
        InputCounter.prototype.checkPlusDisable = function () {
            var isMinusDisabled = this.minusBtn.getAttribute('disabled') !== null;
            if (isMinusDisabled)
                this.minusBtn.removeAttribute('disabled');
            if (this.getInputValue() == this.options.maxValue) {
                this.plusBtn.setAttribute('disabled', 'disabled');
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
            this.minusBtn.addEventListener('click', function () { return _this.decrement(); });
            this.plusBtn.addEventListener('click', function () { return _this.increment(); });
            this.inputElement.addEventListener('input', function () { return _this.inputHandler(); });
            this.inputElement.addEventListener('wheel', function (event) { return _this.wheelHandler(event); });
        };
        InputCounter.prototype.increment = function () {
            var value = this.getInputValue();
            value = ((value + this.options.increment) < this.options.maxValue)
                ? (value + this.options.increment)
                : this.options.maxValue;
            this.setInputValue(value);
            this.checkPlusDisable();
        };
        InputCounter.prototype.decrement = function () {
            var value = this.getInputValue();
            value = ((value - this.options.increment) > this.options.minValue)
                ? (value - this.options.increment)
                : this.options.minValue;
            this.setInputValue(value);
            this.checkMinusDisable();
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
                this.decrement();
            if (event.deltaY < 0)
                this.increment();
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
exports.inputCounter = inputCounter;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);