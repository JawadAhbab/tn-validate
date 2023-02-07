import { Criterion, PossibleType } from '../../../types/Criterion'
import possibleTypes from './possibleTypes'
import isRegExp from '../../validators/isRegExp'
import { cons } from '../../../devconsole/devconsole'

export default function (criteria: Criterion[]) {
  const types: PossibleType[] = []
  const funcs: Function[] = []
  const regexp: RegExp[] = []

  // adding to the list (types, funcs)
  criteria.forEach((type) => {
    // types: string
    if (typeof type === 'string' && possibleTypes.includes(type)) {
      types.push(type)
      return
    }

    // types: constructors & funcs
    const match = type && type.toString().match(/^\s*function (\w+)/)
    const mtype = match ? (match[1].toLowerCase() as PossibleType) : false

    if (mtype && possibleTypes.includes(mtype)) {
      types.push(mtype)
      return
    } else if (typeof type === 'function') {
      funcs.push(type)
      return
    }

    // types: regexp
    if (isRegExp(type)) {
      // @ts-ignore: ts thinks type = string, but its a RegExp
      regexp.push(type)
      return
    }

    if (process.env.NODE_ENV === 'development') {
      cons.validate.getValidators.unsupported(type)
    }
  })

  return { types, funcs, regexp }
}
