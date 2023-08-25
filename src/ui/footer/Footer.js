import { Link } from "react-router-dom/cjs/react-router-dom.min";

import gtIconWhite from "../../icons/github-mark-white.svg";
import gitHubLogo from '../../icons/GitHub_Logo_White.png';

const Footer = ({ isDark }) => {
  return (
    <footer className={"footerSection"}>
      <div className={"footerBlock_left"}>i'm footer</div>
      <div className="footerBlock_middle">
        <Link className="gitBlock" to="#" target="_blank">
          <img className="gitIcon" src={gtIconWhite} alt="link to project's github" />{" "}
          <img className="gitLogo" src={gitHubLogo} alt="link to project's github" />{" "}
        </Link>
      </div>
      <div className="footerBlock_right"> Send feedback </div>
    </footer>
  );
};

export default Footer;
