/**
 * 基于时间戳比较
 * @param {Function} fn
 * @param {number} delay
 * @param {boolean} leading
 * @returns {Function}
 */
function debounce(fn, delay, leading) {
    let lastCalledTime;

    function debounced(...args) {
        const now = Date.now();
        // 第一次调用的时候
        if (lastCalledTime === undefined) {
            lastCalledTime = now;
            if (leading) {
                return fn(...args);
            }
        } else {
            const duration = now - lastCalledTime;
            if (duration >= delay) {
                lastCalledTime = now;
                return fn(...args);
            }
        }
    }

    return debounced;
}

export default debounce;
