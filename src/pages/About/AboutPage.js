import Tilt from "react-parallax-tilt";

import ReactIcon from '../../icons/techs/react';

const AboutPage = () => {
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
                
                {/* <img className="techLogo" src='#'  alt="techs logo" /> */}
                <p className="techDesc"> React </p>
              </div>
              <div className="techCard">
                <img className="techLogo" src="#" alt="techs logo" />
                <p className="techDesc"> React Router </p>
              </div>
              <div className="techCard">
                <img className="techLogo" src="#" alt="techs logo" />
                <p className="techDesc"> SASS </p>
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
                <img className="techLogo" src="#" alt="techs logo" />
                <p className="techDesc"> Nodejs-express </p>
              </div>
              <div className="techCard">
                <img className="techLogo" src="#" alt="techs logo" />
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
              <img className="techLogo" src="#" alt="techs logo" />
              <p className="techDesc vsColor"> Frontend </p>
            </div>
            <div
              className="workConn"
            />
            <div className="techCard">
              <img className="techLogo" src="#" alt="techs logo" />
              <p className="techDesc vsColor"> Rest API </p>
            </div>
            <div className="workConn" />
            <div className="techCard">
              <img className="techLogo" src="#" alt="techs logo" />
              <p className="techDesc vsColor"> MongoDB </p>
            </div>
          </div>
          <div className="techCard techDocker">
              <img className="techLogo" src="#" alt="techs logo" />
              <p className="techDesc vsColor"> Docker </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
