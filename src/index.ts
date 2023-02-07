import isNull_ from './core/validators/isNull'
import isDate_ from './core/validators/isDate'
import isJson_ from './core/validators/isJson'
import isArray_ from './core/validators/isArray'
import validate_ from './core/validate/validate'
import isObject_ from './core/validators/isObject'
import isString_ from './core/validators/typeof/isString'
import isNumber_ from './core/validators/typeof/isNumber'
import isRegExp_ from './core/validators/isRegExp'
import isBoolean_ from './core/validators/typeof/isBoolean'
import isFunction_ from './core/validators/typeof/isFunction'
import isUndefined_ from './core/validators/typeof/isUndefined'
import isArrObject_ from './core/validators/mixed/isArrObject'
import isValidDate_ from './core/validators/isValidDate'
import isNumString_ from './core/validators/mixed/isNumString'
import isNullUndefined_ from './core/validators/mixed/isNullUndefined'
import { Validate } from './types/Validate'
import {
  IsJson,
  IsNull,
  IsDate,
  IsArray,
  IsRegExp,
  IsObject,
  IsString,
  IsNumber,
  IsBoolean,
  IsFunction,
  IsUndefined,
  IsValidDate,
  IsNumString,
  IsArrObject,
  IsNullUndefined
} from './types/SingularModules'

export const validate: Validate = validate_

export const isJson: IsJson = isJson_
export const isNull: IsNull = isNull_
export const isDate: IsDate = isDate_
export const isArray: IsArray = isArray_
export const isRegExp: IsRegExp = isRegExp_
export const isObject: IsObject = isObject_

export const isString: IsString = isString_
export const isNumber: IsNumber = isNumber_
export const isBoolean: IsBoolean = isBoolean_
export const isFunction: IsFunction = isFunction_
export const isUndefined: IsUndefined = isUndefined_
export const isValidDate: IsValidDate = isValidDate_

export const isNumString: IsNumString = isNumString_
export const isArrObject: IsArrObject = isArrObject_
export const isNullUndefined: IsNullUndefined = isNullUndefined_
