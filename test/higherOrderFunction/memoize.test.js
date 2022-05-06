import { strictEqual } from 'assert';
import memoize from '../../src/higherOrderFunction/memoize/memoize.js';

describe('memoize', () => {
    it('should not be call when hit cache', () => {
        let val = 0;
        const fn = (a, b) => {
            val++;
        };
        const memoized = memoize(fn);
        memoized(1, 2);
        strictEqual(val, 1);
        memoized(1, 2);
        strictEqual(val, 1);
        memoized(1, 3);
        strictEqual(val, 2);
        memoized(2, 3);
        strictEqual(val, 3);
    });

    it('should return the cached val when hit cache', () => {
        const fn = (a, b) => ({});
        const memoized = memoize(fn);

        const result = memoized(1, 2);
        strictEqual(result, memoized(1, 2));
        strictEqual(result, memoized(1, 2));
    });

    it('should use generateKey to generate cache key', () => {
        let val = 0;
        const fn = (a, b) => {
            val++;
        };
        const generateKey = (args) => 1;
        const memoized = memoize(fn, generateKey);
        memoized(1, 2);
        strictEqual(val, 1);
        memoized(1, 3);
        strictEqual(val, 1);
        memoized(2, 3);
        strictEqual(val, 1);
    });
});
