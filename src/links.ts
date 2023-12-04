// const isDev = process.env.REACT_APP_ISDEV ? true : false;
// const isDev =true;
// const link = isDev ? 'http://127.0.0.1:3030' : 'http://localhost:40001';
// const link ='http://31.129.108.202:40002';

// const link ='http://127.0.0.1:3030';
const link: string = "http://31.129.108.202:40001";

export const BACK_URL: string = link;
export const LOGIN_URL: string = `${link}/auth/login`;
export const SIGNUP_URL: string = `${link}/auth/signup`;
export const FEED_URL: string = `${link}/userfeed`;
export const ITEM_URL: string = `${link}/item/`;
export const ITEM_FAV: string = `${link}/fav`;
