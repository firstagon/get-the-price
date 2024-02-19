type TInfo = {
  info: {
    header: string;
    text: string;
    imgSrc: string;
    reversed: boolean;
  } | null;
};

const MainInfoBlock: React.FunctionComponent<TInfo> = ({ info }) => {
  const reversed = info?.reversed ? "_reversed" : "";
  return (
      <div className="infoBlock_text">
        <h4 className="headerMain"> {!!info?.header ? info?.header : ""} </h4>
        <div className={`infoBlock_infoColumn${reversed}`}>
          <div className={"infoImg_container" + reversed}>
            <img className="infoImg" src={info?.imgSrc} alt="imaginate this" />
          </div>
          <p className={"infoText_column" + reversed}>{info?.text}</p>
        </div>
      </div>
  );
};

export default MainInfoBlock;
