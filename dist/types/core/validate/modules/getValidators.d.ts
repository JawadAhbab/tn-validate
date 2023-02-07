import { Criterion, PossibleType } from '../../../types/Criterion';
export default function (criteria: Criterion[]): {
    types: PossibleType[];
    funcs: Function[];
    regexp: RegExp[];
};
