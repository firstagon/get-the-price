// import classes from "./HomePage.module.css";

import ItemsChoice from "../ui/ItemChoiceUI/ItemsChoice";
import WelcomeBlock from '../ui/MainElements/welcomeBlock';
import RequestChoice from "../ui/RequestChoice.js/RequestChoice";
import MainInfo from "../ui/MainElements/MainInfo";
import JoinBlock from '../ui/MainElements/JoinBlock';


const isAuth = false;

const HomePage = ({ userState }) => {
  return (
    <div className={'mainBody'}>
      {/* <WelcomeBlock /> */}
      <RequestChoice userState={userState} />
      <JoinBlock />
      <MainInfo />
      {isAuth ? <ItemsChoice /> : ""}
    </div>
  );
};

export default HomePage;
