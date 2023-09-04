import Tilt from "react-parallax-tilt";

const AboutPage = () => {
  return (
    <section className="aboutSection">
      <div className="aboutBlock">
        <h4 className="aboutHeader">Как это сделано</h4>
        <div className="techFeed">
          <Tilt tiltReverse={true} className="techPart">
            <div className="techPart_block">
              <div divReverse={true} className="techCard">
                <img className="techLogo" src="#" alt="techs logo" />
                <p className="techDesc"> React </p>
              </div>
              <div divReverse={true} className="techCard">
                <img className="techLogo" src="#" alt="techs logo" />
                <p className="techDesc"> React Router </p>
              </div>
            </div>
            <p className="techText"> FronEnd </p>
          </Tilt>
          {/* <div className="aboutCircle">
            {" "}
            <div className="aboutCircle_point"></div>{" "}
          </div> */}
          <Tilt tiltReverse={true} className="techPart">
            <div className="techPart_block">
              <div divReverse={true} className="techCard">
                <img className="techLogo" src="#" alt="techs logo" />
                <p className="techDesc"> Nodejs-express </p>
              </div>
              <div divReverse={true} className="techCard">
                <img className="techLogo" src="#" alt="techs logo" />
                <p className="techDesc"> Puppeteer </p>
              </div>
            </div>
            <p className="techText"> BackEnd </p>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
