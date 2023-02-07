import { IsBoolean } from '../../../types/SingularModules'

const isBoolean: IsBoolean = function (value): value is boolean {
  return typeof value === 'boolean'
}

export default isBoolean
