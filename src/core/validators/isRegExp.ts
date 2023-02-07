import { IsRegExp } from '../../types/SingularModules'

const isRegExp: IsRegExp = function (value): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

export default isRegExp
