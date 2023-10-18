import {stateActions as state} from "./state-slice";

export const setError = (obj, dispatch) => {
    dispatch(state.error({
        ...obj
    }))
}