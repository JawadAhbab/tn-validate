type CustomValidator = (value: number) => boolean;
export type PossibleType = typeof possibleTypes[number];
export type Criterion = StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor | FunctionConstructor | RegExpConstructor | RegExp | DateConstructor | 'string' | 'number' | 'boolean' | 'function' | 'array' | 'object' | 'json' | 'null' | 'undefined' | 'regexp' | 'date' | 'valid-date' | CustomValidator;
export declare const possibleTypes: readonly ["string", "number", "boolean", "function", "array", "object", "json", "null", "undefined", "regexp", "date", "valid-date"];
export {};
