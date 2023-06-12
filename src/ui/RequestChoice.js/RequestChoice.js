import { useRef, useReducer } from "react";
import classes from "./RequestChioce.module.css";

const reducer = (state, action) => {
  if (action.type === "submit_isActive") {
    return { ...state, isDisabled: false };
  } else if (action.type === "submit_isDisabled") {
    return { ...state, isDisabled: true };
  }
};

const RequestChoice = () => {
  const inputUrl = useRef();
  const [state, dispatch] = useReducer(reducer, { isDisabled: true });

  const urlValidation = () => {
    // console.log(inputUrl.current.value);
    const input = inputUrl.current.value;
    if (input.length >= 2) {
      dispatch({ type: "submit_isActive" });
    } else {
      dispatch({ type: "submit_isDisabled" });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className={classes.requestSection}>
      <div className={classes.requestBlock}>
        <div className={classes.requestInfo}>
          <form className={classes.formReq}>
            {/* <label for="url"> Url: </label> */}
            <input
              ref={inputUrl}
              onChange={urlValidation}
              id="url"
              type="text"
              name="Enter url"
              placeholder="Enter url to item"
            />
            <input
              onClick={submitHandler}
              disabled={state.isDisabled}
              className=""
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default RequestChoice;
