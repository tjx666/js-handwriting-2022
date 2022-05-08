import { deepEqual, throws } from 'assert';
import defaultsDeep from '../../src/objectUtils/defaultsDeep.js';

describe('defaultsDeep', () => {
    it('should set default value recursively', () => {
        deepEqual(defaultsDeep({}, { a: 1 }, { b: { c: 3 } }), { a: 1, b: { c: 3 } });
        deepEqual(defaultsDeep({ a: 1 }, { a: 2 }, { b: 'b' }), { a: 1, b: 'b' });
        deepEqual(defaultsDeep({ a: {} }, { a: 1 }), { a: {} });
        deepEqual(defaultsDeep({ a: { b: 1 } }, { a: { b: 2, c: 'c' } }), { a: { b: 1, c: 'c' } });
    });

    it('should throw typeError when passed arguments is not pure object', () => {
        throws(() => {
            defaultsDeep(1, 2);
        });
        throws(() => {
            defaultsDeep({}, 2);
        });
        throws(() => {
            defaultsDeep(1, {});
        });
    });
});
