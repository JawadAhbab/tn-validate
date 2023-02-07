import isDate from './isDate'
import { IsValidDate } from '../../types/SingularModules'

const isValidDate: IsValidDate = function (value): value is Date {
  if (isDate(value)) {
    if (!isNaN(value.getTime())) {
      return true
    }
  }

  return false
}

export default isValidDate
