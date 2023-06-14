import { useState, useRef, useEffect } from "react";

import classes from "./LoginPage.module.css";
import Input from "../../ui/InputForms/Input";
import { required, length, email } from "../../util/validators";

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
    },
    formIsValid: false,
  });
  const inputEmail = useRef();
  // const inputPass = useRef();

  const inputChangeHandler = (synteticE) => {
    console.log(state)
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
        formIsValid = formIsValid && !!updatedForm[inputName].valid;
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

    // if (!value) {
    //  return (synteticE.target.placeholder = `Enter ${input}`);
    // }

    setState((prevState) => {
      return {
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

  const submitHandler = (e) => {
    e.preventDefault();

  }

  const eyeHandler = () => {

  }

  return (
    <div className={classes.popupLogin}>
      <div style={{ color: "white" }}> Login page </div>
      <div className={classes.loginBlock}>
        <form className={classes.loginForm}>
          <Input
            ref={inputEmail}
            type="text"
            id="email"
            placeholder="Enter E-mail"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={inputBlurHandler}
            eye={false}
            onChange={inputChangeHandler}
          />
          <Input
            ref={inputEmail}
            type="text"
            id="password"
            placeholder="Enter password"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={inputBlurHandler}
            // eye={state.password.hided}
            onChange={inputChangeHandler}
            eyeClick={eyeHandler}
          />
          {/* <Input
            ref={inputPass}
            type="password"
            id="pass"
            placeholder="Enter password"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Enter E-mail")}
            eye={true}
            eyeToggle={showPass}
            onClick={passIconHandler}
            onChange={inputChangeHandler}
  /> */}
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
