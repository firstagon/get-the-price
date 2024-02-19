import { useSelector } from "react-redux";
import MainInfo from "../ui/HomePage/MainInfo";
import MainHeader from "../ui/HomePage/MainHeader";
import { RootState } from "../store/store";

const HomePage = () => {
  const userState = useSelector((state: RootState) => state.userState);

  return (
    <div className={"mainBody"}>
      <MainHeader isToken={!!userState.token} />
      <MainInfo />
    </div>
  );
};

export default HomePage;
