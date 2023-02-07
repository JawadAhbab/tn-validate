import { AnyObject } from 'tn-typescript'

export const isString = (val: any): val is string => typeof val === 'string'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isFunction = (val: any): val is Function => typeof val === 'function'
export const isUndefined = (val: any): val is undefined => typeof val === 'undefined'

export const isNull = (val: any): val is null => val === null
export const isArray = (val: any): val is any[] => Array.isArray(val)
export const isObject = (val: any): val is AnyObject => Object.prototype.toString.call(val) === '[object Object]'
export const isRegExp = (val: any): val is RegExp => Object.prototype.toString.call(val) === '[object RegExp]'
export const isDate = (val: any): val is Date => Object.prototype.toString.call(val) === '[object Date]'
export const isValidDate = (val: any): val is Date => isDate(val) && !isNaN(val.getTime())
export const isJson = (val: any): val is string => {
  try {
    const obj = JSON.parse(val)
    if (typeof obj === 'object' && obj !== null) return true
  } catch {}
  return false
}

export const isNumString = (val: any): val is number | string => isNumber(val) || isString(val)
export const isArrObject = (val: any): val is any[] | object => isArray(val) || isObject(val)
export const isNullUndefined = (val: any): val is null | undefined => isNull(val) || isUndefined(val)

export const isStrArr = (val: any): val is string[] => isArray(val) && val.map(str => isString(str)).every(i => i)
export const isNumArr = (val: any): val is number[] => isArray(val) && val.map(num => isNumber(num)).every(i => i)
export const isBoolArr = (val: any): val is boolean[] => isArray(val) && val.map(bool => isBoolean(bool)).every(i => i)
export const isNumStrArr = (val: any): val is (string | number)[] => isArray(val) && val.map(numstr => isNumString(numstr)).every(i => i)
