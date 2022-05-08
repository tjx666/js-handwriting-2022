import { deepStrictEqual, strictEqual, throws } from 'assert';
import createObject from '../../src/objectUtils/createObject.js';

describe(`createObject`, () => {
    it('should return the object whose prototype is passed prototype', () => {
        strictEqual(Reflect.getPrototypeOf(createObject(null)), null);
        const prototype = {};
        strictEqual(Reflect.getPrototypeOf(createObject(prototype)), prototype);
        strictEqual(Reflect.getPrototypeOf(createObject(Date.prototype)), Date.prototype);
        throws(() => createObject(1));
        throws(() => createObject(true));
        throws(() => createObject(null).toString());
    });

    it('should assign the properties to the created object', () => {
        deepStrictEqual(createObject({}, { a: { value: 1 } }).a, 1);
        throws(() => createObject({}, null));
    });
});
