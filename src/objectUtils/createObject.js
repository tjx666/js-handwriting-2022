/**
 * 模拟 Object.create
 * @param {Object} prototype
 * @param {Object} properties
 * @returns Object
 */
function createObject(prototype, properties) {
    const isNull = prototype === null;
    const isObject = prototype !== null && typeof prototype === 'object';
    if (!(isNull || isObject)) throw new TypeError('prototype must be null or object');

    // 核心
    const obj = {};
    Reflect.setPrototypeOf(obj, prototype);

    /*
    // 另一种方案
    function F() {}
    // 当 prototype 为 null, 设置 F.prototype 无效
    F.prototype = prototype;
    const obj = new F();
     */

    if (typeof properties !== 'undefined') {
        Object.defineProperties(obj, properties);
    }

    return obj;
}

export default createObject;
