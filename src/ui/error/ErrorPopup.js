// import crossIcon from "../../icons/cross-closeicon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/error-actions";

const ErrorPopup = (props) => {
  // setTimeout(() => {
  //   props.close()
  // }, 2000);
  const dispatch = useDispatch();

  const errorCloseHandler = () => {
    dispatch(setError({status: null, errorShown: false, error: null}));

  };

  const errState = useSelector(state => state.errorState);

  // console.log(errState);

  return (
    <div className="errorSection">
      <div className="errorBlock">
        <h4 className="errorHeader"> {errState.error.name} </h4>
        <p className="errorText"> {errState.error.message} </p>
        <button className="errorButton_close" onClick={errorCloseHandler}>
          close
        </button>
      </div>
      <div className="closingBlock" onClick={errorCloseHandler}>
        <button className="closingIcon" onClick={errorCloseHandler} />
      </div>
    </div>
  );
};

export default ErrorPopup;
