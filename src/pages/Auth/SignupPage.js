import { useState, useRef, useEffect } from "react";

import classes from "./SignupPage.module.css";

import Input from "../../ui/InputForms/Input";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [isDisabled, setIsDisabled] = useState({
    password: true,
    email: true,
    both: true,
  });
  const inputEmail = useRef();
  const inputPass = useRef();
  const inputPassSec = useRef();
  const clickHandler = (e) => {
    e.preventDefault();
  };

  const passIconHandler = () => {
    setShowPass((prevState) => {
      return !prevState;
    });
  };

  const emailValid = () => {
    const input = inputEmail.current.value;
    if (input.length >= 2) {
      setIsDisabled((prevState) => {
        return { ...prevState, email: false };
      });
    } else {
      setIsDisabled((prevState) => {
        return { ...prevState, email: true };
      });
    }
  };
  const passwordValid = () => {
    const input = inputPass.current.value;
    if (input.length >= 2) {
      setIsDisabled((prevState) => {
        return { ...prevState, password: false };
      });
    } else {
      setIsDisabled((prevState) => {
        return { ...prevState, password: true };
      });
    }
  };

  useEffect(() => {
    if (!isDisabled.password && !isDisabled.email) {
      setIsDisabled((prevState) => {
        return { ...prevState, both: false };
      });
    } else {
      setIsDisabled((prevState) => {
        return { ...prevState, both: true };
      });
    }
  }, [isDisabled.password, isDisabled.email]);

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
            onBlur={(e) => (e.target.placeholder = "Enter E-mail")}
            eye={false}
            onChange={emailValid}
          />
          <Input
            ref={inputPass}
            type="password"
            id="pass"
            placeholder="Enter password"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Enter password")}
            eye={true}
            eyeToggle={showPass}
            onClick={passIconHandler}
            onChange={passwordValid}
          />
          <Input
            ref={inputPassSec}
            type="password"
            id="passSec"
            placeholder="Enter password"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Enter password")}
            eye={true}
            eyeToggle={showPass}
            onClick={passIconHandler}
            onChange={passwordValid}
          />
          <input
            type="submit"
            name="submit"
            placeholder="Submit"
            onClick={clickHandler}
            disabled={isDisabled.both}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
