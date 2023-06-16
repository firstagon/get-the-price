import { useState } from "react";
import classes from "./RequestChioce.module.css";
import Input from "../InputForms/Input";
import { urlOzon } from "../../util/validators";

const RequestChoice = () => {
  const [state, setState] = useState({
    urlForm: {
      url: {
        value: "",
        valid: false,
        touched: false,
        validators: [urlOzon],
      },
    },
    formIsValid: false,
  });

  const inputChangeHandler = (synteticE) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id;

    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.urlForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.urlForm,
        [input]: {
          ...prevState.urlForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        urlForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  const inputBlurHandler = (synteticE) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id;

    console.log(state);

    if (!value) {
      return (synteticE.target.placeholder = `Enter ${input}`);
    }

    setState((prevState) => {
      return {
        ...prevState,
        urlForm: {
          ...prevState.urlForm,
          [input]: {
            ...prevState.urlForm[input],
            touched: true,
          },
        },
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className={classes.requestSection}>
      <div className={classes.requestBlock}>
        <div className={classes.requestInfo}>
          <form className={classes.formReq}>
            {/* <input
              ref={inputUrl}
              onChange={urlValidation}
              id="url"
              type="text"
              name="Enter url"
              placeholder="Enter url to item"
            /> */}
            <Input
              type="text"
              id="url"
              placeholder="Enter url"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={false}
              onChange={inputChangeHandler}
            />
            <input
              onClick={submitHandler}
              disabled={!state.formIsValid}
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
