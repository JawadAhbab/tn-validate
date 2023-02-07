import isArray from '../isArray'
import isObject from '../isObject'
import { IsArrObject } from '../../../types/SingularModules'

const isArrObject: IsArrObject = function (value): value is any[] | object {
  return isArray(value) || isObject(value)
}

export default isArrObject
