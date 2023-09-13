import { useState } from "react";
// import classes from "./RequestChioce.module.css";
import Input from "../InputForms/Input";
import { urlOzon } from "../../util/validators";
import { BACK_URL } from '../../links';

const RequestChoice = ({ userState, showError }) => {
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

    // console.log(state);

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
    const inputValue = state.urlForm.url.value;
    fetch(BACK_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ url: inputValue, ...userState }),
    }).catch(err => {
      console.log(err)
      showError({message: err.message, name: 'Ошибка подключение к серверу'});
    });
  };

  return (
    <div className={"requestBlock"}>
      <div className={"requestInfo"}>
        <form className={"formReq"}>
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
            className="inputButt"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default RequestChoice;
