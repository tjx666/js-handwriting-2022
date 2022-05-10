export function isPureObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

export function isMergeableObject(value) {
    return Array.isArray(value) || isPureObject(value);
}
