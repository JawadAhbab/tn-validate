import { IsArray } from '../../types/SingularModules'

const isArray: IsArray = function (value): value is any[] {
  return Array.isArray(value)
}

export default isArray
