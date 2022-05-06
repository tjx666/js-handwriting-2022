import { deepEqual, strictEqual } from 'assert';
import { sleep } from '../testUtils/async.js';
import throttle1 from '../../src/higherOrderFunction/throttle/throttle1.js';
import throttle2 from '../../src/higherOrderFunction/throttle/throttle2.js';

[throttle1, throttle2].forEach((throttle, index) => {
    describe(`throttle${index + 1}`, () => {
        it('should fn be throttled', async () => {
            // const start = Date.now();
            const fn = (...args) => {
                // console.log('called at:', Date.now() - start, 'ms');
                return args;
            };
            const throttledFn = throttle(fn, 100, true);
            deepEqual(throttledFn(0), [0]);
            await sleep(10);
            deepEqual(throttledFn(10), undefined);
            await sleep(20);
            deepEqual(throttledFn(30), undefined);
            await sleep(70);
            deepEqual(throttledFn(100), [100]);
            await sleep(50);
            deepEqual(throttledFn(150), undefined);
            await sleep(50);
            deepEqual(throttledFn(200), [200]);
        });

        it('should throttled fn support bind this', () => {
            const fn = function () {
                return this;
            };
            const throttledFn = throttle(fn, 100, true);
            const obj = { throttledFn };
            strictEqual(obj.throttledFn(), obj);
        });
    });
});
