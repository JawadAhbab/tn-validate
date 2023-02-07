import { IsUndefined } from '../../../types/SingularModules'

const isUndefined: IsUndefined = function (value): value is undefined {
  return typeof value === 'undefined'
}

export default isUndefined
