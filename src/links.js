const isDev = process.env.REACT_APP_ISDEV ? true : false;
const link = isDev ? 'http://127.0.0.1:3030' : 'http://localhost:40001';

export const BACK_URL = link;
export const LOGIN_URL = `${link}/auth/login`;
export const SIGNUP_URL = `${link}/auth/signup`;
export const FEED_URL = `${link}/userfeed`;
export const ITEM_URL = `${link}/item/`;