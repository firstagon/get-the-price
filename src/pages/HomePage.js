import classes from "./HomePage.module.css";

import ItemsChoice from "../ui/ItemChoiceUI/ItemsChoice";
import WelcomeBlock from "../ui/MainElements/WelcomeBlock";
import RequestChoice from "../ui/RequestChoice.js/RequestChoice";
import MainInfo from "../ui/MainElements/MainInfo";


const isAuth = false;

const HomePage = ({userState}) => {
  return (
    <div className={classes.mainBody}>
      <WelcomeBlock />
      <RequestChoice userState={userState} />
      <MainInfo />
      {isAuth ? <ItemsChoice /> : ""}
    </div>
  );
};

export default HomePage;
