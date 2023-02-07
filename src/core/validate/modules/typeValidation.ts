import isJson from '../../validators/isJson'
import isRegExp from '../../validators/isRegExp'
import isObject from '../../validators/isObject'
import isArray from '../../validators/isArray'
import isNull from '../../validators/isNull'
import { PossibleType } from '../../../types/Criterion'
import isDate from '../../validators/isDate'
import isValidDate from '../../validators/isValidDate'

export default function (type: PossibleType, value: any) {
  if (type === 'json') {
    return isJson(value)
  } else if (type === 'null') {
    return isNull(value)
  } else if (type === 'object') {
    return isObject(value)
  } else if (type === 'array') {
    return isArray(value)
  } else if (type === 'regexp') {
    return isRegExp(value)
  } else if (type === 'date') {
    return isDate(value)
  } else if (type === 'valid-date') {
    return isValidDate(value)
  } else {
    // string | number | boolean | undefined | function
    return typeof value === type /* eslint-disable-line valid-typeof */
  }
}
