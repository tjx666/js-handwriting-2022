import { deepStrictEqual, strictEqual } from 'assert';
import setIn from '../../src/objectUtils/setIn.js';

describe('lodash.set', () => {
    it('should return passed object when it is not mergeable', () => {
        const object1 = undefined;
        const object2 = null;
        const object3 = new Date();
        const object4 = /a/;
        const object5 = { a: { b: {} } };
        const object6 = { a: 1 };
        const object7 = { a: {} };
        strictEqual(setIn(object1, 'a.b', 2), object1);
        strictEqual(setIn(object2, 'a.b', 2), object2);
        strictEqual(setIn(object3, 'a.b', 2), object3);
        strictEqual(setIn(object4, 'a.b', 2), object4);
        strictEqual(setIn(object5, 'a.b', 2), object5);
        strictEqual(setIn(object6, 'a.b', 2), object6);
        strictEqual(setIn(object7, 'a.b', 2), object7);
    });

    it('should create object when portion is not mergeable and key is not index', () => {
        deepStrictEqual(setIn({ a: 1 }, 'a.b.c', 2), { a: { b: { c: 2 } } });
        deepStrictEqual(setIn({ a: {} }, 'a.b.c', 2), { a: { b: { c: 2 } } });
        deepStrictEqual(setIn({ a: undefined }, 'a.b.c', 2), { a: { b: { c: 2 } } });
        deepStrictEqual(setIn({}, 'a.b.c', 2), { a: { b: { c: 2 } } });
    });

    it('should create array when portion is not mergeable and key is index', () => {
        deepStrictEqual(setIn({ a: 1 }, 'a[2].c', 3), { a: [, , { c: 3 }] });
        deepStrictEqual(setIn({ a: {} }, 'a[2].c', 3), { a: { 2: { c: 3 } } });
    });
});
