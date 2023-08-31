import crossIcon from "../../icons/cross-closeicon.svg";

const ErrorPopup = (props) => {
  // setTimeout(() => {
  //   props.close()
  // }, 2000);

  return (
    <div className="errorSection">
      <div className="errorBlock">
        <h4 className="errorHeader"> {props.error.name} </h4>
        <p className="errorText"> {props.error.message} </p>
        <button className="errorButton_close" onClick={props.close}>
          close
        </button>
      </div>
      <div className="closingBlock" onClick={props.close}>
        <button className="closingIcon" onClick={props.close} />
      </div>
    </div>
  );
};

export default ErrorPopup;
