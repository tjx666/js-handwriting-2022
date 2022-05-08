import { deepStrictEqual, throws } from 'assert';
import objectAssign from '../../src/objectUtils/objectAssign.js';

describe('Object.assign', () => {
    it('should shadow copy the source to target', () => {
        deepStrictEqual(objectAssign({}, { a: 1 }), { a: 1 });
        deepStrictEqual(objectAssign({ a: 0 }, { a: 1 }), { a: 1 });
        deepStrictEqual(objectAssign({ a: { c: 3 } }, { a: { b: 2 } }), { a: { b: 2 } });
        const key = Symbol('for test1');
        deepStrictEqual(objectAssign({}, { [key]: 1 }), { [key]: 1 });
    });

    it('should only copy enumerated property', () => {
        const obj = {
            a: 1,
        };
        Object.defineProperty(obj, 'b', {
            value: 2,
            enumerable: false,
        });
        Object.defineProperty(obj, Symbol('for test2'), {
            value: 's',
            enumerable: false,
        });
        deepStrictEqual(objectAssign({}, obj), { a: 1 });
    });

    it('should throw error when assign writable false property', () => {
        const obj = { a: 1 };
        Object.defineProperty(obj, 'b', {
            value: 2,
            writable: false,
            enumerable: true,
        });
        throws(() => objectAssign(obj, { b: 3 }));
    });
});
