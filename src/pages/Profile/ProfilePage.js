import classes from "./ProfilePage.module.css";

import ChangePassword from "./ChangePassword";

const props = {
  showBackdrop: false,
  showMobileNav: false,
  isAuth: true,
  token: null,
  userId: "sdfsdf2342342",
  authLoading: false,
  error: null,
  errorShown: false,
  name: null,
};

const ProfilePage = () => {
  const passwordChangeHandler = (e) => {
    // fetch to url for chanching password
  };

  return (
    <section className={classes.profileSection}>
      <div className={classes.profileBlock}>
        <h3 className={classes.profileBlock_text}>
          Welcome {props.name ? props.name : "UserName"}
        </h3>
        <div className={classes.changePassword_section}>
          <p className={classes.profileBlock_text}> Смена пароля: </p>
          <ChangePassword onPasswordChange={passwordChangeHandler} />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
