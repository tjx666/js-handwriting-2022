import assert from 'assert';
import promiseResolve from '../../src/promise/promiseResolve.js';
import { sleep } from '../testUtils/async.js';

describe('Promise.resolve', () => {
    it('should return the origin promise when pass promise', () => {
        const fulfilledPromise = sleep(10);
        assert.strictEqual(promiseResolve(fulfilledPromise), Promise.resolve(fulfilledPromise));

        const rejectedPromise = sleep(10).then(() => {
            throw new Error('for test1');
        });
        assert.strictEqual(promiseResolve(rejectedPromise), Promise.resolve(rejectedPromise));
    });

    it("should return new Promise when pass thenable object and trace it's status", async () => {
        const fulfilledPromise = promiseResolve({
            then(resolve) {
                sleep(10).then(() => resolve());
            },
        });
        assert.ok(fulfilledPromise instanceof Promise);
        await fulfilledPromise;

        const rejectedPromise = {
            then(_, reject) {
                sleep(10).then(() => {
                    reject(new Error('for test2'));
                });
            },
        };
        assert.rejects(rejectedPromise);
    });

    it('should return wrapped promise when passed value is neither Promise nor thenable object', async () => {
        const values = [
            1,
            'a',
            true,
            {},
            [],
            new Date(),
            /666/,
            undefined,
            null,
            new Error('for test3'),
        ];

        for (const value of values) {
            const p1 = Promise.resolve(value);
            assert.ok(p1 instanceof Promise);
            assert.strictEqual(value, await p1)

            const p2 = promiseResolve(value);
            assert.ok(p2 instanceof Promise);
            assert.strictEqual(value, await p2)
        }
    });
});
