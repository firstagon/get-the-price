// import classes from "./HomePage.module.css";
import { useSelector } from 'react-redux';

import ItemsChoice from "../ui/ItemChoiceUI/ItemsChoice";
// import WelcomeBlock from "../ui/MainElements/WelcomeBlock";
import RequestChoice from "../ui/RequestChoice.js/RequestChoice";
import MainInfo from "../ui/HomePage/MainInfo";
import CardBlock from "../ui/HomePage/CardBlock";
import MainLogo from "../ui/HomePage/MainLogo";
import MainThree from '../ui/three/mainWrapper/MainThree';

const isAuth = false;
// let ratio = 50;

const HomePage = ({ showError, showStatus }) => {
  const userState = useSelector((state) => state.userState);

  return (

    <div className={"mainBody"}>
      {/* <WelcomeBlock /> */}
      <MainThree />
      <MainLogo />
      {!!userState.token && <RequestChoice />}
      <CardBlock isToken={!!userState.token} />
      <MainInfo />
      {isAuth ? <ItemsChoice /> : ""}
    </div>

  );
};

export default HomePage;