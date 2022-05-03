import { sleep } from '../../test/testUtils/async.js';

/**
 * @param {Array<() => Promise>} promiseCreators
 * @param {number} limit
 * @returns {Promise}
 */
function promiseLimit(promiseCreators, limit) {
    return new Promise((resolve, reject) => {
        const results = [];
        let fulfilledCount = 0;
        let rejected = false;
        let nextTaskIndex = 0;

        function addTask(index) {
            const promise = Promise.resolve(promiseCreators[index]());
            promise.then(
                (value) => {
                    if (rejected) return;

                    results[index] = value;
                    fulfilledCount++;
                    if (fulfilledCount === promiseCreators.length) resolve(results);

                    if (nextTaskIndex < promiseCreators.length) {
                        addTask(nextTaskIndex);
                        nextTaskIndex++;
                    }
                },
                (error) => {
                    rejected = true;
                    reject(error);
                },
            );
        }

        const firstBatchTasks = promiseCreators.slice(0, limit);
        for (const [index, promiseCreator] of firstBatchTasks.entries()) {
            addTask(index, promiseCreator);
        }
        nextTaskIndex = firstBatchTasks.length;
    });
}

async function main() {
    const promises = [
        () => sleep(1000).then(() => console.log(1)),
        () => sleep(1000).then(() => console.log(1)),
        () => sleep(1000).then(() => console.log(1)),
        () => sleep(2000).then(() => console.log(2)),
        () => sleep(2000).then(() => console.log(2)),
        () => sleep(2000).then(() => console.log(2)),
        () => sleep(3000).then(() => console.log(3)),
        () => sleep(3000).then(() => console.log(3)),
        () => sleep(3000).then(() => console.log(3)),
    ];

    await promiseLimit(promises, 3);
}

main();
