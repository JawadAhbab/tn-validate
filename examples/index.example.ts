import { validate, isNumString } from '../src/index'

console.log(validate('str'));
console.log(validate('str', Number));
console.log(validate('str', String, Number));

console.log(isNumString('str'));
console.log(isNumString(33));
