import {SET_WALKTHROUGH} from './types';

export const setWalkthrough = (walkthrough) => {
    return {
        type:SET_WALKTHROUGH,
        walkthrough
    };
}