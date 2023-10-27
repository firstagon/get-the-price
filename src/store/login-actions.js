import { stateActions as state } from "./state-slice";
import { errorActions as errState } from './error-slice';
import { itemsActions } from "./items-slice";

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

    dispatch(itemsActions.clearAll());

};

export const login = (authData, history) => {
    return async (dispatch) => {
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(authData),
        })
            .then((res) => {
                if (res.status !== 200) {

                    const error = {
                        name: 'Ошибка подключения',
                        message: 'Проблемы с подключением к серверу.',
                    }

                    if (res.status === 422) {
                        // throw new Error("Validation failed.");

                        error.name = 'Validation failed';
                        error.message = 'Validation failed';
                    }
                    if (res.status !== 200 && res.status !== 201) {
                        if (res.status === 401) {
                            // throw new Error("User not exist or incorrect password.");

                            error.name = 'Validation failed';
                            error.message = "User not exist or incorrect password.";
                        }
                        // throw new Error("Could not authenticate you!");

                        error.name = 'Validation failed';
                        error.message = "Could not authenticate you!";
                    }

                    dispatch(errState.error({
                        error: error,
                        errorShown: true,
                    }));
                }

                // throw new Error('Server error')

                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((resData) => {
                if (!resData) {
                    return
                }
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

                history.push('/');
            })
            .catch((err) => {
                const newErr = {
                    name: 'Ошибка подключения',
                    message: 'Проблемы с подключением к серверу.'
                }
                const error = err.message === 'Failed to fetch' ? newErr : err;

                dispatch(errState.error({
                    error: error,
                    errorShown: true,
                }));
            });
    }
};

export const signup = (authData, history) => {
    return async (dispatch) => {
        fetch(SIGNUP_URL, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(authData),
        })
            .then((res) => {
                if (res.status !== 201) {

                    const error = {
                        name: 'Ошибка подключения',
                        message: 'Проблемы с подключением к серверу.',
                    }

                    if (res.status === 422) {
                        error.name = 'Validation failed.';
                        error.message = "Make shure the email adress isn't used yet"
                    } else if (res.status !== 200 && res.status !== 201) {
                        error.name = 'Validation failed.';
                        error.message = "Creating a user failed"
                    }

                    dispatch(errState.error({
                        error: error,
                        errorShown: true,
                    }));

                }

                if (res.status === 201) {
                    return res.json();
                }
            })
            .then((resData) => {
                if (!resData) {
                    return;
                };

                dispatch(login({
                    ...authData
                }, history));
            })
            .catch((err) => {
                const newErr = {
                    name: 'Ошибка подключения',
                    message: 'Проблемы с подключением к серверу.'
                }
                const error = err.message === 'Failed to fetch' ? newErr : err;

                dispatch(errState.error({
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
