import {INITIALIZE_APP} from './types';

export const initializeApp = (adduxes, walkthrough) => {

    return {
        type: INITIALIZE_APP,
        adduxes,
        walkthrough
    };
};