import isNull from '../isNull'
import isUndefined from '../typeof/isUndefined'
import { IsNullUndefined } from '../../../types/SingularModules'

const isNullUndefined: IsNullUndefined = function (value): value is null | undefined {
  return isNull(value) || isUndefined(value)
}

export default isNullUndefined
