import getValidators from './modules/getValidators'
import { cons } from '../../devconsole/devconsole'
import typeValidation from './modules/typeValidation'
import { Validate } from '../../types/Validate'

const validate: Validate = function (value, ...criteria) {
  // if no validator given
  if (!criteria.length) {
    return true
  }

  // getting the validators - types, funcs
  const { types, funcs, regexp } = getValidators(criteria)

  // if no supported validator found
  if (!types.length && !funcs.length && !regexp.length) {
    if (process.env.NODE_ENV === 'development') {
      cons.index.noValidator(value, criteria)
    }
    return false
  }

  // validate by types
  let valid: boolean = !types.length
  types.forEach((type) => {
    valid = valid || typeValidation(type, value)
  })
  if (!valid) {
    return false
  }

  // validate by funcs
  funcs.forEach((func) => {
    valid = !!(valid && func(value))
  })

  // validate by regexp
  if (regexp.length) {
    if (typeof value !== 'string') {
      return false
    }
    regexp.forEach((reg) => {
      valid = !!(valid && value.match(reg))
    })
  }

  return valid
}

export default validate
