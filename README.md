## Main module - `validate()`

```ts
import { validate } from 'tn-validate'

const value: any
const criteria: Criterion[]

validate(value, ...criteria)
```

## Singular Modules

_Better **TypeScript** Support with singular modules_

- `isString()`
- `isSymbol()`
- `isNumber()`
- `isBoolean()`
- `isFunction()`
- `isUndefined()`
- `isNull()`
- `isArray()`
- `isObject()`
- `isRegExp()`
- `isDate()`
- `isValidDate()`
- `isJson()`
- `isNumString()`
- `isArrObject()`
- `isNullUndefined()`
- `isStrArr()`
- `isNumArr()`
- `isBoolArr()`
- `isNumStrArr()`

## Type `Criterion`

```ts
type CustomValidator = (value: number) => boolean

type Criterion =
  | 'string'
  | StringConstructor
  | 'number'
  | NumberConstructor
  | 'boolean'
  | BooleanConstructor
  | 'function'
  | FunctionConstructor
  | 'array'
  | ArrayConstructor
  | 'object'
  | ObjectConstructor
  | 'regexp'
  | RegExpConstructor
  | 'date'
  | DateConstructor
  | 'valid-date'
  | 'json'
  | 'null'
  | 'undefined'
  | RegExp
  | CustomValidator
```

# Examples

```ts
validate('any')
validate('string', String)
validate('school', String, Boolean)
validate(50, Number, val => val > 0 && val < 100)
validate('{}', 'json')
validate(/^\w+$/, RegExp)
validate('foo-bar', /^foo-.+/)
```
