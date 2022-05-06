import { strictEqual } from 'assert';
import curry from '../../src/higherOrderFunction/curry/curry.js';

describe('curry', () => {
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);

    it('should always return fn when accepted arguments not enough', () => {
        strictEqual(typeof curriedAdd(), 'function');
        strictEqual(typeof curriedAdd(), 'function');
        strictEqual(typeof curriedAdd(), 'function');
        strictEqual(typeof curriedAdd(), 'function');

        strictEqual(typeof curriedAdd(1), 'function');
        strictEqual(typeof curriedAdd(1), 'function');
        strictEqual(typeof curriedAdd(1), 'function');
        strictEqual(typeof curriedAdd(1), 'function');

        strictEqual(typeof curriedAdd(1, 2), 'function');
        strictEqual(typeof curriedAdd(1, 2), 'function');
        strictEqual(typeof curriedAdd(1, 2), 'function');
        strictEqual(typeof curriedAdd(1, 2), 'function');

        strictEqual(typeof curriedAdd(1)(2), 'function');
        strictEqual(typeof curriedAdd(1)(2), 'function');
        strictEqual(typeof curriedAdd(1)(2), 'function');
        strictEqual(typeof curriedAdd(1)(2), 'function');
    });

    it('should call fn when passed arguments is enough', () => {
        strictEqual(curriedAdd(1)(2)(3), 6);
        strictEqual(curriedAdd()(1, 2)(3), 6);
        strictEqual(curriedAdd()()(1, 2)(3), 6);
        strictEqual(curriedAdd()()(1)(2)(3), 6);
        strictEqual(curriedAdd(1)(2, 3), 6);
        strictEqual(curriedAdd(1)(2, 3, 4), 6);
    });
});
