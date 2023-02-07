import { PossibleType } from '../../../types/Criterion'
import { isArray, isDate, isJson, isNull, isObject, isRegExp, isValidDate } from '../../validators/validators'

export const typeValidation = (type: PossibleType, value: any) => {
  if (type === 'json') return isJson(value)
  if (type === 'null') return isNull(value)
  if (type === 'object') return isObject(value)
  if (type === 'array') return isArray(value)
  if (type === 'regexp') return isRegExp(value)
  if (type === 'date') return isDate(value)
  if (type === 'valid-date') return isValidDate(value)
  else return typeof value === type
}
