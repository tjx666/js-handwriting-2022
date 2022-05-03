import assert from 'assert';
import promiseAllSettled from '../../src/promise/promiseAllSettled.js';
import { sleep } from '../testUtils/async.js';

describe('Promise.allSettled', () => {
    it('should resolved after promises array all resolve', async () => {
        const promises = [
            sleep(10),
            sleep(10).then(() => {
                throw new Error('for test');
            }),
        ];
        assert.deepEqual(await promiseAllSettled(promises), await Promise.allSettled(promises));
    });

    it('should support pass promise element which is not promise', async () => {
        const promises = [1, 2, 3, new Error('for test')];
        assert.deepEqual(await promiseAllSettled(promises), await Promise.allSettled(promises));
    });
});
