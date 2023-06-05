import classes from "./HomePage.module.css";

import ItemsChoice from "../ui/ItemChoiceUI/ItemsChoice";
import WelcomeBlock from "../ui/mainElements/welcomeBlock";

const HomePage = () => {
  return (
    <div className={classes.mainContainer}>
      <WelcomeBlock />
      <ItemsChoice />
    </div>
  );
};

export default HomePage;
