/**
 * @param {Promise[]} promises
 * @returns {Promise}
 */
function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise)
                .then(
                    (value) => {
                        if (value) {
                            resolve(value);
                        }
                    },
                    (error) => {
                        if (rejected) {
                            reject(error);
                        }
                    },
                );
        }
    });
}

export default promiseAny;
