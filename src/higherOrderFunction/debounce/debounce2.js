/**
 * 使用定时器
 * @param {Function} fn
 * @param {number} delay
 * @param {boolean} leading
 * @returns {Function}
 */
function debounce(fn, delay, leading) {
    let isLock = !leading;
    let timer;

    function debounced(...args) {
        if (timer !== undefined) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            isLock = false;
        }, delay);

        if (!isLock) {
            isLock = true;
            return fn.apply(this, args);
        }
    }

    return debounced;
}

export default debounce;
