import { isMergeableObject } from './utils.js';

/**
 * 合并两个对象
 * @param {Object} target 纯对象或数组
 * @param {Object[]} sources
 * @return {Object} 合并后的 target
 */
function merge(target, ...sources) {
    if (!isMergeableObject(target)) {
        throw new TypeError('target must be pure object or array!');
    }

    for (const source of [...sources]) {
        // 数组或者纯对象
        if (isMergeableObject(source)) {
            for (const [key, value] of Object.entries(source)) {
                const targetValue = target[key];
                // 和 lodash 不一样, lodash 需要 value 也是 mergeable 才会 merge
                // 例如：merge([{}], [1]) 返回 [{}], lodash 返回 [1]
                if (isMergeableObject(targetValue)) {
                    target[key] = merge(targetValue, value);
                } else {
                    target[key] = value;
                }
            }
        }
    }

    return target;
}

export default merge;
