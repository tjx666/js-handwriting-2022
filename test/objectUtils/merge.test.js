import { deepStrictEqual, throws } from 'assert';
import merge from '../../src/objectUtils/merge.js';

describe('merge', () => {
    it('should merge the source to target', () => {
        deepStrictEqual(merge({}, { a: 1 }), { a: 1 });
        deepStrictEqual(merge({ a: 1 }, { a: 2 }), { a: 2 });
        deepStrictEqual(merge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
        deepStrictEqual(merge({ a: { b: 2 } }, { a: { b: 3 } }), { a: { b: 3 } });
        deepStrictEqual(merge([1, 2, 3], [3, 4]), [3, 4, 3]);
        deepStrictEqual(merge([{}, 2], [3, 4]), [{}, 4]);
        deepStrictEqual(merge([{ a: { b: 2, d: 4 } }, 2], [{ a: { b: 2, c: 3 } }, 4]), [
            { a: { b: 2, c: 3, d: 4 } },
            4,
        ]);
        throws(() => merge(1));
        throws(() => merge());
    });
});
