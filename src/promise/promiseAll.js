/**
 * @param {Promise[]} promises
 * @returns {Promise}
 */
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completeCount = 0;
        let anyOneRejected = false;
        for (const [index, promise] of promises.entries()) {
            Promise.resolve(promise)
                .then((value) => {
                    if (anyOneRejected) return;

                    results[index] = value;
                    completeCount++;
                    if (completeCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch((error) => {
                    anyOneRejected = true;
                    reject(error);
                });
        }
    });
}

export default promiseAll;
