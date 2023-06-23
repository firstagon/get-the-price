import { useState } from "react";

import { required, length } from "../../util/validators";
import Input from "../../ui/InputForms/Input";

import classes from "./ChangePassword.module.css";

const ChangePassword = (props) => {
  const [state, setState] = useState({
    changeForm: {
      password: {
        value: "",
        valid: false,
        touched: false,
        hided: true,
        validators: [required, length],
      },
      passwordRepeat: {
        value: "",
        valid: false,
        touched: false,
        hided: true,
        validators: [required, length],
      },
    },
    formIsValid: false,
    passwordsSame: false,
  });

  const higlightClass =
  state.passwordsSame && state.formIsValid
  ? classes.greenHighlight
  : !state.passwordsSame &&
    state.changeForm.passwordRepeat.value
  ? classes.redHighlight
  : '';

  const inputChangeHandler = (synteticE) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id;
    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.changeForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.changeForm,
        [input]: {
          ...prevState.changeForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      let passwordsSame = false;
      for (const inputName in updatedForm) {
        passwordsSame =
          updatedForm.password.value === updatedForm.passwordRepeat.value
            ? true
            : false;
        formIsValid =
          formIsValid &&
          !!updatedForm[inputName].valid &&
          updatedForm.password.value === updatedForm.passwordRepeat.value;
      }
      return {
        changeForm: updatedForm,
        passwordsSame: passwordsSame,
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
        changeForm: {
          ...prevState.changeForm,
          [input]: {
            ...prevState.changeForm[input],
            touched: true,
          },
        },
      };
    });
  };

  const eyeHandler = (synteticE) => {
    const input = synteticE.target.previousSibling.id;
    setState((prevState) => {
      return {
        ...prevState,
        changeForm: {
          ...prevState.changeForm,
          [input]: {
            ...prevState.changeForm[input],
            hided: !prevState.changeForm[input].hided,
          },
        },
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onPasswordChange(state.changeForm.password.value);
  };

  return (
    <form className={classes.changeForm}>
      <Input
        type={state.changeForm.password.hided ? "password" : "text"}
        id="password"
        placeholder="Enter password"
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={inputBlurHandler}
        eye={true}
        hided={state.changeForm.password.hided}
        onChange={inputChangeHandler}
        eyeClick={eyeHandler}
      />
      <Input
        type={state.changeForm.passwordRepeat.hided ? "password" : "text"}
        id="passwordRepeat"
        placeholder="Enter password repeat"
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={inputBlurHandler}
        eye={true}
        hided={state.changeForm.passwordRepeat.hided}
        onChange={inputChangeHandler}
        eyeClick={eyeHandler}
      />
      <button
        className={classes.subButton + " " + higlightClass}
        type="submit"
        name="submit"
        onClick={submitHandler}
        disabled={!state.formIsValid}
      >
        {state.passwordsSame && state.formIsValid
          ? "Отправить" : !state.passwordsSame ? 'Пароли должны быть одинаковые'
          : "Заполните форму"}
      </button>
    </form>
  );
};

export default ChangePassword;
