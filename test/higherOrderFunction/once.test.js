import { strictEqual } from 'assert';
import once from '../../src/higherOrderFunction/once/once1.js';

describe('once', () => {
    it('should fn be called only once', () => {
        let v = 0;
        const fn = () => v++;
        const onced = once(fn);
        onced();
        strictEqual(v, 1);
        onced();
        strictEqual(v, 1);
    });

    it('should return the returned val of first call when called more than once', () => {
        const fn = () => ({});
        const onced = once(fn);
        const obj = onced();
        strictEqual(obj, onced());
    });

    it('should the onced function named endsWith Onced', () => {
        strictEqual(once(function () {}).name, 'Anonymous Onced');

        const fn2 = function fff() {};
        strictEqual(once(fn2).name, 'fff Onced');

        const fn3 = () => {};
        strictEqual(once(fn3).name, 'fn3 Onced');
    });

    it('should onced fn support bind this', () => {
        const fn = function () {
            return this;
        };
        const oncedFn = once(fn, 100, true);
        const obj = { oncedFn };
        strictEqual(obj.oncedFn(), obj);
    });
});
