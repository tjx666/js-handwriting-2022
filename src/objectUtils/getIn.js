/**
 * lodash get
 * @param {Object} object
 * @param {string | Array<string|number>} path
 * @param {any} defaultValue
 */
function getIn(object, path, defaultValue) {
    if (!(Array.isArray(path) || typeof path === 'string')) {
        throw TypeError(`The path: ${path} is neither array nor string!`);
    }

    let propPath;
    if (Array.isArray(path)) {
        propPath = path;
    } else {
        // 特殊情况例如：'[1].b'，所以字符串头部的中括号需要特殊处理
        propPath = path
            .replaceAll(/^\[([^\r\n]*?)\]/g, '$1')
            .replaceAll(/\[([^\r\n]*?)\]/g, '.$1')
            .split('.');
    }

    let value = object;
    while (propPath.length && value !== undefined && value !== null) {
        const frontProp = propPath.shift();
        value = value[frontProp];
    }

    // getIn({ a: null }, 'a', 6) 返回 null
    // lodash _.get(null, [], 6) 返回 6 应该是 bug
    if (propPath.length === 0 && value === null) return value;

    return value ?? defaultValue;
}

export default getIn;
