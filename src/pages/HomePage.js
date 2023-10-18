// import classes from "./HomePage.module.css";
import { useSelector} from 'react-redux';

import ItemsChoice from "../ui/ItemChoiceUI/ItemsChoice";
// import WelcomeBlock from "../ui/MainElements/WelcomeBlock";
import RequestChoice from "../ui/RequestChoice.js/RequestChoice";
import MainInfo from "../ui/HomePage/MainInfo";
import CardBlock from "../ui/HomePage/CardBlock";
import MainLogo from "../ui/HomePage/MainLogo";

const isAuth = false;

const HomePage = ({ showError, showStatus }) => {
  const userState = useSelector((state) => state.userState);
  return (
    <div className={"mainBody"}>
      {/* <WelcomeBlock /> */}
      <MainLogo />
      {!!userState.token && <RequestChoice userState={userState} showStatus={showStatus} showError={showError} />}
      <CardBlock isToken={!!userState.token} />
      <MainInfo />
      {isAuth ? <ItemsChoice /> : ""}
    </div>
  );
};

export default HomePage;
