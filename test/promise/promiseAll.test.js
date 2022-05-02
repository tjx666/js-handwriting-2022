import assert from 'assert';
import promiseAll from '../../src/promise/promiseAll.js';
import { sleep } from '../testUtils/async.js';

describe('Promise.all', () => {
    it('should resolved after promises array all resolve', async () => {
        const promises = [1, 2, 3].map(async (v) => {
            await sleep(10);
            return v;
        });
        assert.deepEqual(await promiseAll(promises), await Promise.all(promises));
    });

    it('should rejected when any of promises rejected', async () => {
        const promises = [1, sleep(10), Promise.reject(new Error('Test PromiseAll reject'))];
        assert.rejects(async () => {
            await promiseAll(promises);
        });
        assert.rejects(async () => {
            await Promise.all(promises);
        });
    });

    it('should support pass promise element which is not promise', async () => {
        const promises = [1, 2, 3, new Error('for test')];
        assert.deepEqual(await promiseAll(promises), await Promise.all(promises));
    });
});
