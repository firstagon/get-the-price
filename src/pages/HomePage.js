// import classes from "./HomePage.module.css";

import ItemsChoice from "../ui/ItemChoiceUI/ItemsChoice";
import WelcomeBlock from "../ui/MainElements/WelcomeBlock";
import RequestChoice from "../ui/RequestChoice.js/RequestChoice";
import MainInfo from "../ui/HomePage/MainInfo";
import CardBlock from "../ui/MainElements/CardBlock";

const isAuth = false;

const HomePage = ({ userState }) => {
  return (
    <div className={"mainBody"}>
      {/* <WelcomeBlock /> */}
      {userState.isAuth && <RequestChoice userState={userState} />}
      <CardBlock isAuth={userState.isAuth} />
      <MainInfo />
      {isAuth ? <ItemsChoice /> : ""}
    </div>
  );
};

export default HomePage;
