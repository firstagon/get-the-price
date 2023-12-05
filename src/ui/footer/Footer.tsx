import { Link, NavLink } from "react-router-dom";

import gtIconWhite from "../../icons/github-mark-white.svg";
import gitHubLogo from "../../icons/GitHub_Logo_White.png";

const Footer = () => {
  return (
    <footer className={"footerSection"}>
      <div className="footerBlock">
        <div className={"footerBlock_left"}>i'm footer</div>
        <div className="footerBlock_middle">
          <Link className="gitBlock" to={{ pathname: 'https://github.com/firstagon/get-the-price' }} target="_blank">
            <img
              className="gitIcon"
              src={gtIconWhite}
              alt="link to project's github"
            />{" "}
            <img
              className="gitLogo"
              src={gitHubLogo}
              alt="link to project's github"
            />{" "}
          </Link>
        </div>
        <div className="footerBlock_right">
          <NavLink to='/about' style={{ color: 'white', borderColor: 'white' }} className="linkText"> About page </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
