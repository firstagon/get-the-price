import { errorActions as state } from "./error-slice";
import type { AppDispatch } from "./store";

// not used
export const setError = (obj: any) => {
    return (dispatch: AppDispatch) => {
        dispatch(state.error({
            ...obj
        }))
    }
}