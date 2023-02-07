import { Criterion } from '../../../types/Criterion';
export declare const getValidators: (criteria: Criterion[]) => {
    types: ("string" | "number" | "boolean" | "undefined" | "object" | "function" | "array" | "json" | "null" | "regexp" | "date" | "valid-date")[];
    funcs: Function[];
    regexp: RegExp[];
};
