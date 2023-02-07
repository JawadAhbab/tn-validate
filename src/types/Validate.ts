import { Criterion } from './Criterion'

export interface Validate {
  (value: any, ...criteria: Criterion[]): boolean
}
