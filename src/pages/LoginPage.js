import { useState, useRef, useEffect } from "react";

import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [isDisabled, setIsDisabled] = useState({ password: true, email: true, both: true });
  const inputEmail = useRef();
  const inputPass = useRef();

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
          <input
            type="text"
            name="email"
            placeholder="E-mail adress"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "E-mail adress")}
            className={classes.onFocus}
            onChange={emailValid}
            ref={inputEmail}
          />
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={classes.inputPassword}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Password")}
            onChange={passwordValid}
            ref={inputPass}
          />
          <i className={classes.eye + " " + (showPass ? classes.eyeOpen : "")} onClick={passIconHandler} />
          <input type="submit" name="submit" placeholder="Submit" onClick={clickHandler} disabled={isDisabled.both} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
