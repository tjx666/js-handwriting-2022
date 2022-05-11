import { strictEqual } from 'assert';
import getIn from '../../src/objectUtils/getIn.js';

describe('lodash get', () => {
    it('should return the value get from prop path string', () => {
        strictEqual(getIn({ a: { b: { c: [1, 2, 3] } } }, 'a.b.c[1]'), 2);
        strictEqual(getIn({ a: { b: { c: [1, { d: 2 }, 3] } } }, 'a.b.c[1][d]'), 2);
        strictEqual(getIn({}, 'a[1]'), undefined);
        strictEqual(getIn([{ a: 1 }], '[0].a'), 1);
    });

    it('should return the value get from prop path array', () => {
        strictEqual(getIn({ a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 1]), 2);
        strictEqual(getIn({ a: { b: { c: [1, { d: 2 }, 3] } } }, ['a', 'b', 'c', '1', 'd']), 2);
        strictEqual(getIn({}, ['a', 1]), undefined);
        strictEqual(getIn([{ a: 1 }], [0, 'a']), 1);
    });

    it('should return default value when meet undefined or null', () => {
        strictEqual(getIn(null, '', 6), 6);
        strictEqual(getIn(undefined, '', 6), 6);
        strictEqual(getIn({ a: 1 }, 'a.b', 6), 6);
        strictEqual(getIn({ a: null }, 'a', 6), null);
        strictEqual(getIn(null, [], 6), null);
    });
});
