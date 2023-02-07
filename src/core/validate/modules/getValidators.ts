import { cons } from '../../../devconsole/devconsole'
import { Criterion, PossibleType, possibleTypes } from '../../../types/Criterion'
import { isRegExp } from '../../validators/validators'

export const getValidators = (criteria: Criterion[]) => {
  const types: PossibleType[] = []
  const funcs: Function[] = []
  const regexp: RegExp[] = []

  criteria.forEach(type => {
    if (typeof type === 'string' && possibleTypes.includes(type)) return types.push(type)
    const match = type && type.toString().match(/^\s*function (\w+)/)
    const mtype = match ? (match[1].toLowerCase() as PossibleType) : false

    if (mtype && possibleTypes.includes(mtype)) return types.push(mtype)
    if (typeof type === 'function') return funcs.push(type)
    if (isRegExp(type)) return regexp.push(type)
    if (process.env.NODE_ENV === 'development') cons.validate.getValidators.unsupported(type)
  })

  return { types, funcs, regexp }
}
