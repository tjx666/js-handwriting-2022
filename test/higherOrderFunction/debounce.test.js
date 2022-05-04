import { deepEqual } from 'assert';
import { sleep } from '../testUtils/async.js';
import debounce1 from '../../src/higherOrderFunction/debounce/debounce1.js';
import debounce2 from '../../src/higherOrderFunction/debounce/debounce2.js';

[debounce1, debounce2].forEach((debounce, index) => {
    describe(`debounce${index + 1}`, () => {
        it('should run fn when first call if leading=true', async () => {
            // const start = Date.now();
            const fn = (...args) => {
                // console.log('called at:', Date.now() - start, 'ms');
                return args;
            };
            const debouncedFn = debounce(fn, 100, true);
            // const debouncedFn = debounce(fn, 100, false);
            await sleep(10);
            deepEqual(debouncedFn(10), [10]);
            await sleep(10);
            deepEqual(debouncedFn(10), undefined);
            await sleep(20);
            deepEqual(debouncedFn(10), undefined);
            await sleep(100);
            deepEqual(debouncedFn(140), [140]);
            await sleep(100);
            deepEqual(debouncedFn(240), [240]);
        });

        it('should not run fn when first call if leading=false', async () => {
            // const start = Date.now();
            const fn = (...args) => {
                // console.log('called at:', Date.now() - start, 'ms');
                return args;
            };
            const debouncedFn = debounce(fn, 100, false);
            await sleep(10);
            deepEqual(debouncedFn(10), undefined);
            await sleep(10);
            deepEqual(debouncedFn(10), undefined);
            await sleep(20);
            deepEqual(debouncedFn(10), undefined);
            await sleep(100);
            deepEqual(debouncedFn(140), [140]);
            await sleep(100);
            deepEqual(debouncedFn(240), [240]);
        });
    }).timeout(2000)
});
