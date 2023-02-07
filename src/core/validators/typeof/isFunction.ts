import { IsFunction } from '../../../types/SingularModules'

const isFunction: IsFunction = function (value): value is Function {
  return typeof value === 'function'
}

export default isFunction
