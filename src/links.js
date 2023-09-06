const isDev = true;
const link = isDev ? '127.0.0.1:3030' : '';

export const LOGIN_URL = `${link}/auth/login`;
export const SIGNUP_URL = `${link}/auth/signup`;
export const FEED_URL = `${link}/userfeed`;
export const ITEM_URL = `${link}/item/`;