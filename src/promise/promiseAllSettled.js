/**
 * @param {Promise[]} promises
 * @returns {Promise}
 */
function promiseAllSettled(promises) {
    const PromiseStatus = {
        Pending: 'pending',
        Fulfilled: 'fulfilled',
        Rejected: 'rejected',
    };
    return new Promise((resolve) => {
        const result = [];
        let settledCount = 0;
        for (const [index, promise] of promises.entries()) {
            Promise.resolve(promise)
                .then(
                    (value) => {
                        result[index] = {
                            status: PromiseStatus.Fulfilled,
                            value,
                        };
                    },
                    (error) => {
                        result[index] = {
                            status: PromiseStatus.Rejected,
                            reason: error,
                        };
                    },
                )
                .finally(() => {
                    settledCount++;
                    if (settledCount === promises.length) {
                        resolve(result);
                    }
                });
        }
    });
}

export default promiseAllSettled;
