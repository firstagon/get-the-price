import classes from "./HomePage.module.css";

import ItemsChoice from "../ui/ItemChoiceUI/ItemsChoice";
import WelcomeBlock from "../ui/MainElements/WelcomeBlock";
import RequestChoice from "../ui/RequestChoice.js/RequestChoice";

const isAuth = false;

const HomePage = () => {
  return (
    <div className={classes.mainContainer}>
      <WelcomeBlock />
      <RequestChoice />
      {isAuth ? <ItemsChoice /> : ''}
    </div>
  );
};

export default HomePage;
