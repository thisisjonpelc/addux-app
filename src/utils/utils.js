/**
 * Returns true if given object is an empty object.  Returns false otherwise.
 * @param {*} obj the object to be tested
 */
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}