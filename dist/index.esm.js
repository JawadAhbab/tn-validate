import _typeof from "@babel/runtime/helpers/esm/typeof";
import { consoler } from 'tn-consoler';

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
      consoler.groupCollapsed("{bgred:error} {yellow+b:validate}{b:()}\n      {grey+b:>} {red+b:No supported validator}");
      consoler.log('{b:Value} :', {}, value);
      consoler.log('{b:Validators} :', {}, criteria);
      consoler.groupEnd(true);
    }
  },
  validate: {
    getValidators: {
      unsupported: function unsupported(type) {
        consoler.groupCollapsed("{bgred:error} {yellow+b:validate}{b:()}\n        {grey+b:>} {red+b:Unsupported validator}");
        consoler.log('{b:Validator} :', {}, type);
        consoler.groupEnd(true);
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
export { isArrObject$1 as isArrObject, isArray$1 as isArray, isBoolean$1 as isBoolean, isDate$1 as isDate, isFunction$1 as isFunction, isJson$1 as isJson, isNull$1 as isNull, isNullUndefined$1 as isNullUndefined, isNumString$1 as isNumString, isNumber$1 as isNumber, isObject$1 as isObject, isRegExp$1 as isRegExp, isString$1 as isString, isUndefined$1 as isUndefined, isValidDate$1 as isValidDate, validate$1 as validate };
