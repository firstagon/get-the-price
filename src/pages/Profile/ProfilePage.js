import { useSelector } from 'react-redux';

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
  const userState = useSelector((state) => state.userstate)

  const passwordChangeHandler = (e) => {
    // fetch to url for chanching password
  };

  return (
    <section className={'profileSection'}>
      <div className={'profileBlock'}>
        <h3 className={'profileBlock_text'}>
          Welcome {props.name ? props.name : "UserName"}
        </h3>
        <div className={'changePassword_section'}>
          <p className={'profileBlock_text'}> Смена пароля: </p>
          <ChangePassword onPasswordChange={passwordChangeHandler} />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
