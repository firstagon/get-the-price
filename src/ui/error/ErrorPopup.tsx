// import crossIcon from "../../icons/cross-closeicon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/error-actions";
import { AppDispatch, RootState } from "../../store/store";

const ErrorPopup = () => {
  const dispatch: AppDispatch = useDispatch();

  const errorCloseHandler = () => {
    dispatch(setError({ status: null, errorShown: false, error: null }));
  };

  const errState = useSelector((state: RootState) => state.errorState);

  return (
    <div className="errorSection">
      <div className="errorBlock">
        <h4 className="errorHeader"> {errState.error?.name} </h4>
        <p className="errorText"> {errState.error?.message} </p>
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
