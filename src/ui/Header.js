import classes from "./Header.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navContainer}>
        <div className={classes.navIcon}> menu </div>
        <NavLink to="/" className={classes.navOption}>
          home
        </NavLink>
        <NavLink to="/login" className={classes.navOption}>
          login
        </NavLink>
      </nav>
      <section className={classes.userContainer}>
        <div className={classes.userData}>
          <div className={classes.userName}> User Name </div>
          <button className={classes.loginButton}> login</button>
        </div>
        <div className={classes.userImage} alt="profile pic">
          A
        </div>
      </section>
    </header>
  );
};

export default Header;
