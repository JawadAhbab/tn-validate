import { consoler } from 'tn-consoler';
const cons = {
  index: {
    noValidator(value, criteria) {
      consoler.groupCollapsed(`{bgred:error} {yellow+b:validate}{b:()}
      {grey+b:>} {red+b:No supported validator}`);
      consoler.log('{b:Value} :', {}, value);
      consoler.log('{b:Validators} :', {}, criteria);
      consoler.groupEnd(true);
    }
  },
  validate: {
    getValidators: {
      unsupported(type) {
        consoler.groupCollapsed(`{bgred:error} {yellow+b:validate}{b:()}
        {grey+b:>} {red+b:Unsupported validator}`);
        consoler.log('{b:Validator} :', {}, type);
        consoler.groupEnd(true);
      }
    }
  }
};
const possibleTypes = ['string', 'number', 'boolean', 'function', 'array', 'object', 'json', 'null', 'undefined', 'regexp', 'date', 'valid-date'];
const isString = val => typeof val === 'string';
const isNumber = val => typeof val === 'number';
const isBoolean = val => typeof val === 'boolean';
const isFunction = val => typeof val === 'function';
const isUndefined = val => typeof val === 'undefined';
const isNull = val => val === null;
const isArray = val => Array.isArray(val);
const isObject = val => Object.prototype.toString.call(val) === '[object Object]';
const isRegExp = val => Object.prototype.toString.call(val) === '[object RegExp]';
const isDate = val => Object.prototype.toString.call(val) === '[object Date]';
const isValidDate = val => isDate(val) && !isNaN(val.getTime());
const isJson = val => {
  try {
    const obj = JSON.parse(val);
    if (typeof obj === 'object' && obj !== null) return true;
  } catch {}
  return false;
};
const isNumString = val => isNumber(val) || isString(val);
const isArrObject = val => isArray(val) || isObject(val);
const isNullUndefined = val => isNull(val) || isUndefined(val);
const isStrArr = val => isArray(val) && val.map(str => isString(str)).every(i => i);
const isNumArr = val => isArray(val) && val.map(num => isNumber(num)).every(i => i);
const isBoolArr = val => isArray(val) && val.map(bool => isBoolean(bool)).every(i => i);
const isNumStrArr = val => isArray(val) && val.map(numstr => isNumString(numstr)).every(i => i);
const getValidators = criteria => {
  const types = [];
  const funcs = [];
  const regexp = [];
  criteria.forEach(type => {
    if (typeof type === 'string' && possibleTypes.includes(type)) return types.push(type);
    const match = type && type.toString().match(/^\s*function (\w+)/);
    const mtype = match ? match[1].toLowerCase() : false;
    if (mtype && possibleTypes.includes(mtype)) return types.push(mtype);
    if (typeof type === 'function') return funcs.push(type);
    if (isRegExp(type)) return regexp.push(type);
    if (process.env.NODE_ENV === 'development') cons.validate.getValidators.unsupported(type);
  });
  return {
    types,
    funcs,
    regexp
  };
};
const typeValidation = (type, value) => {
  if (type === 'json') return isJson(value);
  if (type === 'null') return isNull(value);
  if (type === 'object') return isObject(value);
  if (type === 'array') return isArray(value);
  if (type === 'regexp') return isRegExp(value);
  if (type === 'date') return isDate(value);
  if (type === 'valid-date') return isValidDate(value);else return typeof value === type;
};
const validate = function (value) {
  for (var _len = arguments.length, criteria = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    criteria[_key - 1] = arguments[_key];
  }
  if (!criteria.length) return true;
  const {
    types,
    funcs,
    regexp
  } = getValidators(criteria);
  if (!types.length && !funcs.length && !regexp.length) {
    if (process.env.NODE_ENV === 'development') cons.index.noValidator(value, criteria);
    return false;
  }
  let valid = !types.length;
  types.forEach(type => valid = valid || typeValidation(type, value));
  if (!valid) return false;
  funcs.forEach(func => valid = !!(valid && func(value)));
  if (regexp.length) {
    if (typeof value !== 'string') return false;
    regexp.forEach(reg => valid = !!(valid && value.match(reg)));
  }
  return valid;
};
export { isArrObject, isArray, isBoolArr, isBoolean, isDate, isFunction, isJson, isNull, isNullUndefined, isNumArr, isNumStrArr, isNumString, isNumber, isObject, isRegExp, isStrArr, isString, isUndefined, isValidDate, validate };
