import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showNotice } from "../../store/notice-actions";
import Input from "../InputForms/Input";
import { urlOzon } from "../../util/validators";
import { BACK_URL } from "../../links";
import type { AppDispatch, RootState } from "../../store/store";
import { TextChange } from "typescript";

interface IState {
  urlForm: {
    [url: string]: {
      value: string | null;
      valid: boolean;
      touched: boolean;
      validators: Function[];
    };
  };
  formIsValid: boolean;
}

const RequestChoice = () => {
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.userState);
  // const noticeState = useSelector((state: RootState) => state.noticeState);
  const [state, setState] = useState<IState>({
    urlForm: {
      url: {
        value: "",
        valid: false,
        touched: false,
        validators: [urlOzon],
      },
    },
    formIsValid: false,
  });

  const inputChangeHandler = <T extends React.SyntheticEvent<HTMLInputElement>>(synteticE: T) => {
    const value = (synteticE.currentTarget as HTMLInputElement).value;
    const input = synteticE.currentTarget.id;

    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.urlForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.urlForm,
        [input]: {
          ...prevState.urlForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        urlForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  const inputBlurHandler = <T extends React.SyntheticEvent<HTMLInputElement>>(synteticE: T) => {
    const value = synteticE.currentTarget.value;
    const input = synteticE.currentTarget.id;

    if (!value) {
      return (synteticE.currentTarget.placeholder = `Enter ${input}`);
    }

    setState((prevState) => {
      return {
        ...prevState,
        urlForm: {
          ...prevState.urlForm,
          [input]: {
            ...prevState.urlForm[input],
            touched: true,
          },
        },
      };
    });
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const inputValue = state.urlForm.url.value;

    dispatch(showNotice("loading"));

    fetch(BACK_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `${userState.token}`,
      },
      body: JSON.stringify({ url: inputValue, ...userState }),
    })
      .then((res) => {
        if (res.status === 500) {
          dispatch(showNotice("errorLink"));
          return;
        }
        dispatch(showNotice("loaded"));
      })
      .catch((err) => {
        dispatch(showNotice("error"));
      });
  };

  return (
    <div className={"requestBlock"}>
      <div className={"requestInfo"}>
        <form className={"formReq"}>
          <Input
            type="text"
            id="url"
            placeholder="Введите ссылку на товар"
            onFocus={(e) => ((e.target as HTMLInputElement).placeholder = "")}
            onBlur={(e) => inputBlurHandler(e)}
            eye={false}
            onChange={(e) => inputChangeHandler(e)}
          />
          <input
            onClick={submitHandler}
            disabled={!state.formIsValid}
            className="inputButt"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default RequestChoice;
