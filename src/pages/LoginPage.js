import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const clickHandler = (e) => {
    e.preventDefault();
  };

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
            type="password"
            name="password"
            placeholder="Password"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Password")}
          />
          <input
            type="submit"
            name="submit"
            placeholder="Submit"
            onClick={clickHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
