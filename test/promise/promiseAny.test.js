import assert from 'assert';
import promiseAny from '../../src/promise/promiseAny.js';
import { sleep } from '../testUtils/async.js';

describe('Promise.any', () => {
    it('should resolved at least one promise resolved', async () => {
        const promises = [
            sleep(30).then(() => 666),
            sleep(10).then(() => {
                throw new Error('for test 1');
            }),
        ];
        assert.equal(await promiseAny(promises), await Promise.any(promises));
    });

    it('should rejected when when all promises rejected is rejected', async () => {
        const promises = [
            sleep(10).then(() => {
                throw new Error('for test 2-1');
            }),
            sleep(10).then(() => {
                throw new Error('for test 2-2');
            }),
        ];
        assert.rejects(async () => {
            await promiseAny(promises);
        });
        assert.rejects(async () => {
            await Promise.any(promises);
        });
    });

    it('should support pass promise element which is not promise', async () => {
        const promises = [1, 2, 3, new Error('for test 3')];
        assert.deepEqual(await promiseAny(promises), await Promise.any(promises));
    });
});
