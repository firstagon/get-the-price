import RequestChoice from "../RequestChoice/RequestChoice";
import CardBlock from "./CardBlock";
import MainLogo from "./MainLogo";
import ShortInfo from "./ShortInfo";
import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  isToken: boolean
}
type Ref = HTMLDivElement;

const MainHeader = forwardRef<Ref, Props>((props, ref) => {
  return (
    <div ref={ref} className="mainHeader">
      <MainLogo />
      {props.isToken && <RequestChoice />}
      <CardBlock isToken={props.isToken} />
      <ShortInfo />
    </div>
  );
});

export default MainHeader;
