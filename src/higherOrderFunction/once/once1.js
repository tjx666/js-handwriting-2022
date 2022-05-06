/**
 * 利用闭包变量保存调用次数和第一次运行结果
 * @param {Function} fn
 */
function once(fn) {
    let called = false;
    let result;

    const oncedFnName = (fn.name === '' ? 'Anonymous' : fn.name) + ' Onced';
    const temp = {
        [oncedFnName]: function (...args) {
            if (!called) {
                result = fn.apply(this, args);
                called = true;
            }
            return result;
        },
    };
    return temp[oncedFnName];
}

export default once;
