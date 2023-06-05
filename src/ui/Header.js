import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      {/* <nav className={classes.navContainer}>
            <div className={classes.navIcon}> menu </div>
            <ul className={classes.navMenu}>
                <li className={classes.navOption}> home </li>
                <li className={classes.navOption}> go to </li>
            </ul>
        </nav> */}
      <section className={classes.userContainer}>
        <div className={classes.userData}>
          <div className={classes.userName}> User Name </div>
          <button className={classes.loginButton}> login</button>
        </div>
        <div className={classes.userImage} alt="profile pic"> A </div>
      </section>
    </header>
  );
};

export default Header;
