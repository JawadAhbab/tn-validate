import { IsString } from '../../../types/SingularModules'

const isString: IsString = function (value): value is string {
  return typeof value === 'string'
}

export default isString
