export default function promiseResolve(value) {
    if (value instanceof Promise) {
        return value;
    }

    const isObject = value !== null && typeof value === 'object';
    if (isObject && value.then) {
        return new Promise((resolve, reject) => {
            value.then(
                (value) => {
                    resolve(value);
                },
                (error) => {
                    reject(error);
                },
            );
        });
    }

    return new Promise((resolve) => resolve(value));
}
