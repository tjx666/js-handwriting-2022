import assert from 'assert';
import promiseRace from '../../src/promise/promiseRace.js';
import { sleep } from '../testUtils/async.js';

describe('Promise.race', () => {
    it('should resolved when when first settled promise is resolved', async () => {
        const promises = [
            sleep(10).then(() => 666),
            sleep(30).then(() => {
                throw new Error('for test 1');
            }),
        ];
        assert.equal(await promiseRace(promises), await Promise.race(promises));
    });

    it('should rejected when when first settled promise is rejected', async () => {
        const promises = [
            sleep(30).then(() => 666),
            sleep(10).then(() => {
                throw new Error('for test 2');
            }),
        ];
        assert.rejects(async () => {
            await promiseRace(promises);
        });
        assert.rejects(async () => {
            await Promise.race(promises);
        });
    });

    it('should support pass promise element which is not promise', async () => {
        const promises = [1, 2, 3, new Error('for test 3')];
        assert.deepEqual(await promiseRace(promises), await Promise.race(promises));
    });
});
