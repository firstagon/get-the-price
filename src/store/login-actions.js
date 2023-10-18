import { stateActions as state } from "./state-slice";

import { LOGIN_URL, SIGNUP_URL } from '../links';

export const logout = (dispatch) => {
    dispatch(state.logOut({
        isAuth: false,
        token: null,
        name: null,
        userId: null,
    }));
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
};

export const login = (authData) => {

    return async (dispatch) => {
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(authData),
        })
            .then((res) => {
                if (res.status === 422) {
                    throw new Error("Validation failed.");
                }
                if (res.status !== 200 && res.status !== 201) {
                    if (res.status === 401) {
                        throw new Error("User not exist or incorrect password.");
                    }
                    console.log("Error!");
                    throw new Error("Could not authenticate you!");
                }
                return res.json();
            })
            .then((resData) => {
                dispatch(state.logIn({
                    isAuth: true,
                    token: resData.token,
                    authLoading: false,
                    userId: resData.userId,
                    name: resData.name,
                }))
                localStorage.setItem("token", resData.token);
                localStorage.setItem("userId", resData.userId);
                localStorage.setItem("name", resData.name);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem("expiryDate", expiryDate.toISOString());
            })
            .catch((err) => {
                const newErr = {
                    name: 'Ошибка подключения',
                    message: 'Проблемы с подключением к серверу.'
                }
                const error = err.message === 'Failed to fetch' ? newErr : err;

                dispatch(state.error({
                    isAuth: false,
                    authLoading: false,
                    error: error,
                    errorShown: true,
                }));
            });
    }
};

export const signup = (authData) => {
    return async (dispatch) => {

        fetch(SIGNUP_URL, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(authData),
        })
            .then((res) => {
                if (res.status === 422) {
                    throw new Error(
                        "Validation failed. Make shure the email adress isn't used yet"
                    );
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log("Error!");
                    throw new Error("Creating a user failed");
                }
                return res.json();
            })
            .then((resData) => {
                dispatch(state.logIn({
                    authData
                }))
                // newHistory.replace("/");
            })
            .catch((err) => {
                const newErr = {
                    name: 'Ошибка подключения',
                    message: 'Проблемы с подключением к серверу.'
                }
                const error = err.message === 'Failed to fetch' ? newErr : err;

                dispatch(state.error({
                    isAuth: false,
                    authLoading: false,
                    error: error,
                    errorShown: true,
                }));
            });
    }
};

export const init = (el) => {
    return (dispatch) => {
        dispatch(state.logIn({
            ...el
        }))
    }
}
