import { useState } from "react";

import classes from "./SignupPage.module.css";

import Input from "../../ui/InputForms/Input";
import { required, length, email, same } from "../../util/validators";

const LoginPage = () => {
  const [state, setState] = useState({
    loginForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
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
  });

  const inputChangeHandler = (synteticE) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id;
    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.loginForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid =
          formIsValid &&
          !!updatedForm[inputName].valid &&
          updatedForm.password.value === updatedForm.passwordRepeat.value;
      }
      return {
        loginForm: updatedForm,
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
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
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
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            hided: !prevState.loginForm[input].hided,
          },
        },
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.popupLogin}>
      <div className={classes.loginBlock}>
        <form className={classes.loginForm}>
          <Input
            type="text"
            id="email"
            placeholder="Enter E-mail"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={inputBlurHandler}
            eye={false}
            onChange={inputChangeHandler}
          />
          <Input
            type={state.loginForm.password.hided ? "password" : "text"}
            id="password"
            placeholder="Enter password"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={inputBlurHandler}
            eye={true}
            hided={state.loginForm.password.hided}
            onChange={inputChangeHandler}
            eyeClick={eyeHandler}
          />
          <Input
            type={state.loginForm.passwordRepeat.hided ? "password" : "text"}
            id="passwordRepeat"
            placeholder="Enter password repeat"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={inputBlurHandler}
            eye={true}
            hided={state.loginForm.passwordRepeat.hided}
            onChange={inputChangeHandler}
            eyeClick={eyeHandler}
          />
          <input
            type="submit"
            name="submit"
            placeholder="Submit"
            onClick={submitHandler}
            disabled={!state.formIsValid}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
