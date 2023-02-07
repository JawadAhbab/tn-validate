'use strict';

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, '__esModule', {
  value: true
});

var tnConsoler = require('tn-consoler');

var isNull = function isNull(value) {
  return value === null;
};

var isDate = function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
};

var isJson = function isJson(value) {
  try {
    var obj = JSON.parse(value);

    if (_typeof(obj) === 'object' && obj !== null) {
      return true;
    }
  } catch (e) {}

  return false;
};

var isArray = function isArray(value) {
  return Array.isArray(value);
};

var possibleTypes = ['string', 'number', 'boolean', 'function', 'array', 'object', 'json', 'null', 'undefined', 'regexp', 'date', 'valid-date'];

var isRegExp = function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]';
};

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

function getValidators(criteria) {
  var types = [];
  var funcs = [];
  var regexp = []; // adding to the list (types, funcs)

  criteria.forEach(function (type) {
    // types: string
    if (typeof type === 'string' && possibleTypes.includes(type)) {
      types.push(type);
      return;
    } // types: constructors & funcs


    var match = type && type.toString().match(/^\s*function (\w+)/);
    var mtype = match ? match[1].toLowerCase() : false;

    if (mtype && possibleTypes.includes(mtype)) {
      types.push(mtype);
      return;
    } else if (typeof type === 'function') {
      funcs.push(type);
      return;
    } // types: regexp


    if (isRegExp(type)) {
      // @ts-ignore: ts thinks type = string, but its a RegExp
      regexp.push(type);
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      cons.validate.getValidators.unsupported(type);
    }
  });
  return {
    types: types,
    funcs: funcs,
    regexp: regexp
  };
}

var isObject = function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

var isValidDate = function isValidDate(value) {
  if (isDate(value)) {
    if (!isNaN(value.getTime())) {
      return true;
    }
  }

  return false;
};

function typeValidation(type, value) {
  if (type === 'json') {
    return isJson(value);
  } else if (type === 'null') {
    return isNull(value);
  } else if (type === 'object') {
    return isObject(value);
  } else if (type === 'array') {
    return isArray(value);
  } else if (type === 'regexp') {
    return isRegExp(value);
  } else if (type === 'date') {
    return isDate(value);
  } else if (type === 'valid-date') {
    return isValidDate(value);
  } else {
    // string | number | boolean | undefined | function
    return _typeof(value) === type;
    /* eslint-disable-line valid-typeof */
  }
}

var validate = function validate(value) {
  for (var _len = arguments.length, criteria = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    criteria[_key - 1] = arguments[_key];
  }

  // if no validator given
  if (!criteria.length) {
    return true;
  } // getting the validators - types, funcs


  var _getValidators = getValidators(criteria),
      types = _getValidators.types,
      funcs = _getValidators.funcs,
      regexp = _getValidators.regexp; // if no supported validator found


  if (!types.length && !funcs.length && !regexp.length) {
    if (process.env.NODE_ENV === 'development') {
      cons.index.noValidator(value, criteria);
    }

    return false;
  } // validate by types


  var valid = !types.length;
  types.forEach(function (type) {
    valid = valid || typeValidation(type, value);
  });

  if (!valid) {
    return false;
  } // validate by funcs


  funcs.forEach(function (func) {
    valid = !!(valid && func(value));
  }); // validate by regexp

  if (regexp.length) {
    if (typeof value !== 'string') {
      return false;
    }

    regexp.forEach(function (reg) {
      valid = !!(valid && value.match(reg));
    });
  }

  return valid;
};

var isString = function isString(value) {
  return typeof value === 'string';
};

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};

var isBoolean = function isBoolean(value) {
  return typeof value === 'boolean';
};

var isFunction = function isFunction(value) {
  return typeof value === 'function';
};

var isUndefined = function isUndefined(value) {
  return typeof value === 'undefined';
};

var isArrObject = function isArrObject(value) {
  return isArray(value) || isObject(value);
};

var isNumString = function isNumString(value) {
  return isNumber(value) || isString(value);
};

var isNullUndefined = function isNullUndefined(value) {
  return isNull(value) || isUndefined(value);
};

var validate$1 = validate;
var isJson$1 = isJson;
var isNull$1 = isNull;
var isDate$1 = isDate;
var isArray$1 = isArray;
var isRegExp$1 = isRegExp;
var isObject$1 = isObject;
var isString$1 = isString;
var isNumber$1 = isNumber;
var isBoolean$1 = isBoolean;
var isFunction$1 = isFunction;
var isUndefined$1 = isUndefined;
var isValidDate$1 = isValidDate;
var isNumString$1 = isNumString;
var isArrObject$1 = isArrObject;
var isNullUndefined$1 = isNullUndefined;
exports.isArrObject = isArrObject$1;
exports.isArray = isArray$1;
exports.isBoolean = isBoolean$1;
exports.isDate = isDate$1;
exports.isFunction = isFunction$1;
exports.isJson = isJson$1;
exports.isNull = isNull$1;
exports.isNullUndefined = isNullUndefined$1;
exports.isNumString = isNumString$1;
exports.isNumber = isNumber$1;
exports.isObject = isObject$1;
exports.isRegExp = isRegExp$1;
exports.isString = isString$1;
exports.isUndefined = isUndefined$1;
exports.isValidDate = isValidDate$1;
exports.validate = validate$1;
