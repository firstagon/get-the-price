import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  return (
    <footer className={"footerSection"}>
      <div className={"footerBlock_left"}>i'm footer</div>
      <div className="footerBlock_middle">
        <Link to="#" target="_blank">
          <img src="#" alt="link to project's github" />{" "}
        </Link>
      </div>
      <div className="footerBlock_right"> Send feedback </div>
    </footer>
  );
};

export default Footer;
