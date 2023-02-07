import { consoler } from 'tn-consoler'

export const cons = {
  index: {
    noValidator (value: any, criteria: any[]) {
      consoler.groupCollapsed(`{bgred:error} {yellow+b:validate}{b:()}
      {grey+b:>} {red+b:No supported validator}`)
      consoler.log('{b:Value} :', {}, value)
      consoler.log('{b:Validators} :', {}, criteria)
      consoler.groupEnd(true)
    }
  },
  validate: {
    getValidators: {
      unsupported (type: any) {
        consoler.groupCollapsed(`{bgred:error} {yellow+b:validate}{b:()}
        {grey+b:>} {red+b:Unsupported validator}`)
        consoler.log('{b:Validator} :', {}, type)
        consoler.groupEnd(true)
      }
    }
  }
}
