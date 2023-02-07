import { IsDate } from '../../types/SingularModules'

const isDate: IsDate = function (value): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export default isDate
