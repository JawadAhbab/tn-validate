import { IsNumber } from '../../../types/SingularModules'

const isNumber: IsNumber = function (value): value is number {
  return typeof value === 'number'
}

export default isNumber
