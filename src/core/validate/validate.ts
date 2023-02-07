import { cons } from '../../devconsole/devconsole'
import { Criterion } from '../../types/Criterion'
import { getValidators } from './modules/getValidators'
import { typeValidation } from './modules/typeValidation'

export const validate = function (value: any, ...criteria: Criterion[]) {
  if (!criteria.length) return true
  const { types, funcs, regexp } = getValidators(criteria)

  if (!types.length && !funcs.length && !regexp.length) {
    if (process.env.NODE_ENV === 'development') cons.index.noValidator(value, criteria)
    return false
  }

  let valid: boolean = !types.length
  types.forEach(type => (valid = valid || typeValidation(type, value)))
  if (!valid) return false

  funcs.forEach(func => (valid = !!(valid && func(value))))

  if (regexp.length) {
    if (typeof value !== 'string') return false
    regexp.forEach(reg => (valid = !!(valid && value.match(reg))))
  }

  return valid
}
