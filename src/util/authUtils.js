import { ACCESS_TOKEN } from './constants';

export const isUserAuthenticated = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return true;
    }

    return false;
}