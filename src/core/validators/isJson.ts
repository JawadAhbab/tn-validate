import { IsJson } from '../../types/SingularModules'

const isJson: IsJson = function (value): value is string {
  try {
    const obj = JSON.parse(value)
    if (typeof obj === 'object' && obj !== null) {
      return true
    }
  } catch (e) {}

  return false
}

export default isJson
