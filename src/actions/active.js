import {SET_ACTIVE} from './types';

export const setActive = (id) => {
    return {
        type:SET_ACTIVE,
        id
    }
};
