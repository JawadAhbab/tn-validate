'use strict';

var _typeof = require("@babel/runtime/helpers/typeof").default;
var tnConsoler = require('tn-consoler');
var cons = {
  index: {
    noValidator: function noValidator(value, criteria) {
      tnConsoler.consoler.groupCollapsed("{bgred:error} {yellow+b:validate}{b:()}\n      {grey+b:>} {red+b:No supported validator}");
      tnConsoler.consoler.log('{b:Value} :', {}, value);
      tnConsoler.consoler.log('{b:Validators} :', {}, criteria);
      tnConsoler.consoler.groupEnd(true);
    }
  },
  validate: {
    getValidators: {
      unsupported: function unsupported(type) {
        tnConsoler.consoler.groupCollapsed("{bgred:error} {yellow+b:validate}{b:()}\n        {grey+b:>} {red+b:Unsupported validator}");
        tnConsoler.consoler.log('{b:Validator} :', {}, type);
        tnConsoler.consoler.groupEnd(true);
      }
    }
  }
};
var possibleTypes = ['string', 'number', 'boolean', 'function', 'array', 'object', 'json', 'null', 'undefined', 'regexp', 'date', 'valid-date'];
var isString = function isString(val) {
  return typeof val === 'string';
};
var isNumber = function isNumber(val) {
  return typeof val === 'number';
};
var isBoolean = function isBoolean(val) {
  return typeof val === 'boolean';
};
var isFunction = function isFunction(val) {
  return typeof val === 'function';
};
var isUndefined = function isUndefined(val) {
  return typeof val === 'undefined';
};
var isNull = function isNull(val) {
  return val === null;
};
var isArray = function isArray(val) {
  return Array.isArray(val);
};
var isObject = function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
};
var isRegExp = function isRegExp(val) {
  return Object.prototype.toString.call(val) === '[object RegExp]';
};
var isDate = function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]';
};
var isValidDate = function isValidDate(val) {
  return isDate(val) && !isNaN(val.getTime());
};
var isJson = function isJson(val) {
  try {
    var obj = JSON.parse(val);
    if (_typeof(obj) === 'object' && obj !== null) return true;
  } catch (_unused) {}
  return false;
};
var isNumString = function isNumString(val) {
  return isNumber(val) || isString(val);
};
var isArrObject = function isArrObject(val) {
  return isArray(val) || isObject(val);
};
var isNullUndefined = function isNullUndefined(val) {
  return isNull(val) || isUndefined(val);
};
var isStrArr = function isStrArr(val) {
  return isArray(val) && val.map(function (str) {
    return isString(str);
  }).every(function (i) {
    return i;
  });
};
var isNumArr = function isNumArr(val) {
  return isArray(val) && val.map(function (num) {
    return isNumber(num);
  }).every(function (i) {
    return i;
  });
};
var isBoolArr = function isBoolArr(val) {
  return isArray(val) && val.map(function (bool) {
    return isBoolean(bool);
  }).every(function (i) {
    return i;
  });
};
var isNumStrArr = function isNumStrArr(val) {
  return isArray(val) && val.map(function (numstr) {
    return isNumString(numstr);
  }).every(function (i) {
    return i;
  });
};
var getValidators = function getValidators(criteria) {
  var types = [];
  var funcs = [];
  var regexp = [];
  criteria.forEach(function (type) {
    if (typeof type === 'string' && possibleTypes.includes(type)) return types.push(type);
    var match = type && type.toString().match(/^\s*function (\w+)/);
    var mtype = match ? match[1].toLowerCase() : false;
    if (mtype && possibleTypes.includes(mtype)) return types.push(mtype);
    if (typeof type === 'function') return funcs.push(type);
    if (isRegExp(type)) return regexp.push(type);
    if (process.env.NODE_ENV === 'development') cons.validate.getValidators.unsupported(type);
  });
  return {
    types: types,
    funcs: funcs,
    regexp: regexp
  };
};
var typeValidation = function typeValidation(type, value) {
  if (type === 'json') return isJson(value);
  if (type === 'null') return isNull(value);
  if (type === 'object') return isObject(value);
  if (type === 'array') return isArray(value);
  if (type === 'regexp') return isRegExp(value);
  if (type === 'date') return isDate(value);
  if (type === 'valid-date') return isValidDate(value);else return _typeof(value) === type;
};
var validate = function validate(value) {
  for (var _len = arguments.length, criteria = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    criteria[_key - 1] = arguments[_key];
  }
  if (!criteria.length) return true;
  var _getValidators = getValidators(criteria),
    types = _getValidators.types,
    funcs = _getValidators.funcs,
    regexp = _getValidators.regexp;
  if (!types.length && !funcs.length && !regexp.length) {
    if (process.env.NODE_ENV === 'development') cons.index.noValidator(value, criteria);
    return false;
  }
  var valid = !types.length;
  types.forEach(function (type) {
    return valid = valid || typeValidation(type, value);
  });
  if (!valid) return false;
  funcs.forEach(function (func) {
    return valid = !!(valid && func(value));
  });
  if (regexp.length) {
    if (typeof value !== 'string') return false;
    regexp.forEach(function (reg) {
      return valid = !!(valid && value.match(reg));
    });
  }
  return valid;
};
exports.isArrObject = isArrObject;
exports.isArray = isArray;
exports.isBoolArr = isBoolArr;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isJson = isJson;
exports.isNull = isNull;
exports.isNullUndefined = isNullUndefined;
exports.isNumArr = isNumArr;
exports.isNumStrArr = isNumStrArr;
exports.isNumString = isNumString;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isRegExp = isRegExp;
exports.isStrArr = isStrArr;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isValidDate = isValidDate;
exports.validate = validate;
