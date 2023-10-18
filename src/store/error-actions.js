import { state } from "./state-actions";

export const setError = (obj, dispatch) => {
    dispatch(state.error({
        ...obj
    }))
}