declare type CustomValidator = (value: number) => boolean;
export declare type Criterion = (StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor | FunctionConstructor | RegExpConstructor | RegExp | DateConstructor | 'string' | 'number' | 'boolean' | 'function' | 'array' | 'object' | 'json' | 'null' | 'undefined' | 'regexp' | 'date' | 'valid-date' | CustomValidator);
export declare type PossibleType = 'string' | 'number' | 'boolean' | 'function' | 'array' | 'object' | 'json' | 'null' | 'undefined' | 'regexp' | 'date' | 'valid-date';
export {};
