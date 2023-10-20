import { errorActions as state } from "./error-slice";

export const setError = (obj) => {
    return (dispatch) => {
        dispatch(state.error({
            ...obj
        }))
    }
}