/**
 * Returns true if given object is an empty object.  Returns false otherwise.
 * @param {*} obj the object to be tested
 */
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const validatePassword = (password) => {

    const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W|_])(?=.{8,})/;

    if(!passwordExpression.test(password)){
        return false;
    }
    else{
        return true;
    }

}