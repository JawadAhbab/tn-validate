import { AnyObject } from 'tn-typescript'

export interface IsJson {
  (value: any): value is string
}
export interface IsNull {
  (value: any): value is null
}
export interface IsDate {
  (value: any): value is Date
}
export interface IsArray {
  (value: any): value is any[]
}
export interface IsRegExp {
  (value: any): value is RegExp
}
export interface IsObject {
  (value: any): value is AnyObject
}

export interface IsString {
  (value: any): value is string
}
export interface IsNumber {
  (value: any): value is number
}
export interface IsBoolean {
  (value: any): value is boolean
}
export interface IsFunction {
  (value: any): value is Function
}
export interface IsUndefined {
  (value: any): value is undefined
}
export interface IsValidDate {
  (value: any): value is Date
}

export interface IsNumString {
  (value: any): value is number | string
}
export interface IsArrObject {
  (value: any): value is any[] | object
}
export interface IsNullUndefined {
  (value: any): value is null | undefined
}
