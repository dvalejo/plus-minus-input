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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/counter.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/counter.ts":
/*!************************!*\
  !*** ./src/counter.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var PlusMinusInput = (function () {\r\n    var counterClass = \"input-counter\";\r\n    var counterDefaultValue = 1;\r\n    var counterIncrement = 1;\r\n    var holdDelay = 500;\r\n    var incrementDelay = 50;\r\n    var Counter = /** @class */ (function () {\r\n        function Counter(input) {\r\n            this.inputElement = input;\r\n        }\r\n        Counter.prototype.render = function () {\r\n            var wrapper = document.createElement(\"div\");\r\n            var plusBtn = document.createElement(\"span\");\r\n            var minusBtn = document.createElement(\"span\");\r\n            var parent = this.inputElement.parentNode;\r\n            wrapper.className = counterClass;\r\n            minusBtn.className = counterClass + \"__minus\";\r\n            minusBtn.innerHTML = \"&minus;\";\r\n            minusBtn.addEventListener(\"click\", this.minusOnClick.bind(this));\r\n            minusBtn.addEventListener(\"mousedown\", this.minusOnMousedown.bind(this));\r\n            minusBtn.addEventListener(\"mouseup\", this.clearTimers.bind(this));\r\n            minusBtn.addEventListener(\"mouseout\", this.clearTimers.bind(this));\r\n            plusBtn.className = counterClass + \"__plus\";\r\n            plusBtn.innerHTML = \"&plus;\";\r\n            plusBtn.addEventListener(\"click\", this.plusOnClick.bind(this));\r\n            plusBtn.addEventListener(\"mousedown\", this.plusOnMousedown.bind(this));\r\n            plusBtn.addEventListener(\"mouseup\", this.clearTimers.bind(this));\r\n            plusBtn.addEventListener(\"mouseout\", this.clearTimers.bind(this));\r\n            this.inputElement.className = counterClass + \"__field\";\r\n            this.inputElement.addEventListener(\"input\", this.inputOnInput.bind(this));\r\n            this.inputElement.setAttribute(\"value\", counterDefaultValue.toString());\r\n            wrapper.appendChild(minusBtn);\r\n            wrapper.appendChild(this.inputElement);\r\n            wrapper.appendChild(plusBtn);\r\n            parent.appendChild(wrapper);\r\n        };\r\n        Counter.prototype.minusOnClick = function (e) {\r\n            var value = parseInt(this.inputElement.value);\r\n            if (!isNaN(value)) {\r\n                if (value > counterIncrement) {\r\n                    value -= counterIncrement;\r\n                }\r\n            }\r\n            else {\r\n                value = counterDefaultValue;\r\n            }\r\n            this.inputElement.value = value.toString();\r\n            this.inputElement.setAttribute(\"value\", this.inputElement.value);\r\n        };\r\n        Counter.prototype.minusOnMousedown = function (e) {\r\n            var _this = this;\r\n            var value;\r\n            var oldValue = parseInt(this.inputElement.value);\r\n            var increment = counterIncrement;\r\n            this.holdTimer = setTimeout(function () {\r\n                _this.incrementTimer = setInterval(function () {\r\n                    value = parseInt(_this.inputElement.value);\r\n                    if (value > increment) {\r\n                        value -= increment;\r\n                        _this.inputElement.value = value.toString();\r\n                        if ((oldValue - value) > (increment * 50)) {\r\n                            increment *= 11;\r\n                        }\r\n                    }\r\n                }, incrementDelay);\r\n            }, holdDelay);\r\n        };\r\n        Counter.prototype.plusOnClick = function (e) {\r\n            var value = parseInt(this.inputElement.value);\r\n            if (!isNaN(value)) {\r\n                value += counterIncrement;\r\n            }\r\n            else {\r\n                value = counterDefaultValue;\r\n            }\r\n            this.inputElement.value = value.toString();\r\n            this.inputElement.setAttribute(\"value\", this.inputElement.value);\r\n        };\r\n        Counter.prototype.plusOnMousedown = function (e) {\r\n            var _this = this;\r\n            var value;\r\n            var oldValue = parseInt(this.inputElement.value);\r\n            var increment = counterIncrement;\r\n            this.holdTimer = setTimeout(function () {\r\n                _this.incrementTimer = setInterval(function () {\r\n                    value = parseInt(_this.inputElement.value);\r\n                    value += increment;\r\n                    _this.inputElement.value = value.toString();\r\n                    if ((value - oldValue) > (increment * 50)) {\r\n                        increment *= 11;\r\n                    }\r\n                }, incrementDelay);\r\n            }, holdDelay);\r\n        };\r\n        Counter.prototype.inputOnInput = function (e) {\r\n            this.inputElement.setAttribute(\"value\", this.inputElement.value);\r\n        };\r\n        Counter.prototype.clearTimers = function () {\r\n            this.inputElement.setAttribute(\"value\", this.inputElement.value);\r\n            if (this.incrementTimer) {\r\n                clearInterval(this.incrementTimer);\r\n            }\r\n            if (this.holdTimer) {\r\n                clearTimeout(this.holdTimer);\r\n            }\r\n        };\r\n        return Counter;\r\n    }());\r\n    console.log(Counter);\r\n    return {\r\n        init: function (options) {\r\n            var elements;\r\n            var counter;\r\n            counterClass = options.counterClass || counterClass;\r\n            counterDefaultValue = options.defaultValue || counterDefaultValue;\r\n            counterIncrement = options.counterIncrement || counterIncrement;\r\n            holdDelay = options.holdDelay || holdDelay;\r\n            incrementDelay = options.incrementDelay || incrementDelay;\r\n            try {\r\n                elements = document.querySelectorAll(\".\" + counterClass);\r\n            }\r\n            catch (e) {\r\n                console.warn(\"Please enter a valid selector. \" + e);\r\n                return;\r\n            }\r\n            if (elements.length === 0)\r\n                return;\r\n            for (var i = 0, len = elements.length; i < len; i++) {\r\n                counter = new Counter(elements[i]);\r\n                counter.render();\r\n            }\r\n        }\r\n    };\r\n})();\r\nPlusMinusInput.init({\r\n    counterClass: \"\",\r\n    defaultValue: 1,\r\n    counterIncrement: 1,\r\n    holdDelay: 500,\r\n    incrementDelay: 50\r\n});\r\n\n\n//# sourceURL=webpack:///./src/counter.ts?");

/***/ })

/******/ });