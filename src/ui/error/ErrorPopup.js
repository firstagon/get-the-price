import classes from "./ErrorPopup.module.css";
import crossIcon from "../../icons/cross-closeicon.svg";

const ErrorPopup = (props) => {
  // console.log(props.error);

  // setTimeout(() => {
  //   props.close()
  // }, 2000);

  return (
    <div className={classes.errorSection}>
      <div className={classes.errorBlock}>
      <img src={crossIcon} alt="closing button" className={classes.closingIcon} onClick={props.close}  />
        <h4 className={classes.errorHeader}> {props.error.name} </h4>
        <p className={classes.errorText}> {props.error.message} </p>
        <button className={classes.errorButton_close} onClick={props.close}>
          {" "}
          close{" "}
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
