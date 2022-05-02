/**
 * @param {Promise[]} promises
 * @returns {Promise}
 */
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        let anyOneSettled = false;
        for (const promise of promises) {
            Promise.resolve(promise).then(
                (value) => {
                    // 没这个判断也没关系，当一个 promise 处于非 pending 状态，再次 resolve 或者 reject 会无事发生
                    if (anyOneSettled) return;

                    anyOneSettled = true;
                    resolve(value);
                },
                (error) => {
                    if (anyOneSettled) return;

                    anyOneSettled = true;
                    reject(error);
                },
            );
        }
    });
}

export default promiseRace;
