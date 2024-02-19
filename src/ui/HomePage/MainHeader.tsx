import RequestChoice from "../RequestChoice/RequestChoice";
import CardBlock from "./CardBlock";
import MainLogo from "./MainLogo";
import ShortInfo from "./ShortInfo";

const MainHeader = ({ isToken }: { isToken: boolean }) => {
  return (
    <div className="mainHeader">
      <MainLogo />
      {isToken && <RequestChoice />}
      <CardBlock isToken={isToken} />;
      <ShortInfo />
    </div>
  );
};

export default MainHeader;
