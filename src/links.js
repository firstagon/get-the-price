// const isDev = process.env.REACT_APP_ISDEV ? true : false;
const isDev =true;
const link = isDev ? 'http://127.0.0.1:3030' : 'http://localhost:40001';
// const link ='http://31.129.108.202:40002';

export const BACK_URL = link;
export const LOGIN_URL = `${link}/auth/login`;
export const SIGNUP_URL = `${link}/auth/signup`;
export const FEED_URL = `${link}/userfeed`;
export const ITEM_URL = `${link}/item/`;
export const ITEM_FAV = `${link}/fav`;