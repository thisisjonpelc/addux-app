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

export const stopVideo = (videoElement) => {
    // saves the current iframe source
    var vidsrc = videoElement.getAttribute('src');//$frame.attr('src');

    // sets the source to nothing, stopping the video
    //$frame.attr('src', '');
    videoElement.setAttribute('src', '');


    // sets it back to the correct link so that it reloads immediately on the next window open
    //$frame.attr('src', vidsrc);
    videoElement.setAttribute('src', vidsrc);
}