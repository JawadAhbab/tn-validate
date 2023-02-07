import { IsNull } from '../../types/SingularModules'

const isNull: IsNull = function (value): value is null {
  return value === null
}

export default isNull
