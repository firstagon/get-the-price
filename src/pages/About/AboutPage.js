import Tilt from "react-parallax-tilt";

import ReactIcon from '../../icons/techs/react';
import ReactRouterIcon from "../../icons/techs/reactRouter";
import SccsIcon from '../../icons/techs/seal-color.png';
import NodeIcon from "../../icons/techs/nodeIcon";
import PptrIcon from '../../icons/techs/pptrIcon';
import MonitorIcon from "../../icons/techs/build/monitor";
import ServerIcon from "../../icons/techs/build/server";
import DockerLogo from "../../icons/techs/build/dockerFull";

const AboutPage = () => {
  console.log(process.env.REACT_APP_STR);
  return (
    <section className="aboutSection">
      <div className="aboutBlock">
        <h4 className="aboutHeader">Использованные технологии</h4>
        <div className="techFeed">
          <Tilt
            tiltReverse={true}
            tiltMaxAngleY={5}
            tiltMaxAngleX={10}
            className="techPart"
          >
            <div className="cardsWrapper">
              <div className="techCard">
                <ReactIcon cssclass={'techLogo'} />
                <p className="techDesc"> React </p>
              </div>
              <div className="techCard">
                <ReactRouterIcon cssclass={"techLogo"} />
                {/* <img className="techLogo" src="#" alt="techs logo" /> */}
                <p className="techDesc"> React Router </p>
              </div>
              <div className="techCard">
                <img className="techLogo" src={SccsIcon} alt="techs logo" />
                <p className="techDesc"> SCSS </p>
              </div>
            </div>
            <p className="techText"> FronEnd </p>
          </Tilt>
          {/* <div className="aboutCircle">
            {" "}
            <div className="aboutCircle_point"></div>{" "}
          </div> */}
          <Tilt
            tiltReverse={true}
            tiltMaxAngleY={5}
            tiltMaxAngleX={10}
            className="techPart"
          >
            <div className="cardsWrapper">
              <div className="techCard">
                <NodeIcon cssclass='techLogo' />
                <p className="techDesc"> Express </p>
              </div>
              <div className="techCard">
                <PptrIcon cssclass={'tecgLogo'} />
                <p className="techDesc"> Puppeteer </p>
              </div>
            </div>
            <p className="techText"> BackEnd </p>
          </Tilt>
        </div>
      </div>

      <div className="aboutBlock">
        <h4 className="aboutHeader"> Схема работы </h4>
        <div className="dockerWrapper">
          <div className="workFeed _cluster">
            <div className="techCard">
              <MonitorIcon />
              <p className="techDesc vsColor"> Frontend </p>
            </div>
            <div
              className="workConn"
            />
            <div className="techCard">
              <ServerIcon />
              <p className="techDesc vsColor"> Rest API </p>
            </div>
            <div className="workConn" />
            <div className="techCard">
              {/* <img className="techLogo" src="#" alt="techs logo" /> */}
              <ServerIcon />
              <p className="techDesc vsColor"> MongoDB </p>
            </div>
          </div>
          <div className="techCard ">
            {/* <img className="techLogo" src="#" alt="techs logo" /> */}
            <DockerLogo className='techLogo techDocker' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
