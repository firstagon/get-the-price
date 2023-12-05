// import classes from "./HomePage.module.css";
import { useSelector } from "react-redux";

// import WelcomeBlock from "../ui/MainElements/WelcomeBlock";
import RequestChoice from "../ui/RequestChoice.js/RequestChoice";
import MainInfo from "../ui/HomePage/MainInfo";
import CardBlock from "../ui/HomePage/CardBlock";
import MainLogo from "../ui/HomePage/MainLogo";
import { AppDispatch, RootState } from "../store/store";
import { Root } from "react-dom/client";

const isAuth = false;
// let ratio = 50;

const HomePage = () => {
  const userState = useSelector((state: RootState) => state.userState);

  return (
    <div className={"mainBody"}>
      <MainLogo />
      {!!userState.token && <RequestChoice />}
      <CardBlock isToken={!!userState.token} />
      <MainInfo />
    </div>
  );
};

export default HomePage;
