import { useState } from "react";

import classes from "./SignupPage.module.css";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const clickHandler = (e) => {
    e.preventDefault();
  };

  const passIconHandler = () => {
    setShowPass((prevState) => {
      return !prevState;
    })
  }

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
          />
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className={classes.inputPassword}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Password")}
          />
          <i className={classes.eye + ' ' + (showPass ? classes.eyeOpen : '')} onClick={passIconHandler} />
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className={classes.inputPassword}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Password")}
          />
          <i className={classes.eye + ' ' + (showPass ? classes.eyeOpen : '')} onClick={passIconHandler} />
          <input type="submit" name="submit" placeholder="Submit" onClick={clickHandler} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
