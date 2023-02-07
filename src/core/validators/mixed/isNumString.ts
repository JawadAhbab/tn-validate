import isNumber from '../typeof/isNumber'
import isString from '../typeof/isString'
import { IsNumString } from '../../../types/SingularModules'

const isNumString: IsNumString = function (value): value is number | string {
  return isNumber(value) || isString(value)
}

export default isNumString
