import { IsObject } from '../../types/SingularModules'

const isObject: IsObject = function (value): value is object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export default isObject
