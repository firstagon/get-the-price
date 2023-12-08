import { useState } from "react";

import Input from "../../ui/InputForms/Input";
import { required, length, email } from "../../util/validators";
import { useDispatch } from "react-redux";
// @ts-ignore
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../store/login-actions";
import { AppDispatch } from "../../store/store";

interface ILogin {
  loginForm: {
    email: {
      value: string;
      valid: boolean;
      touched: boolean;
      validators: ((value: string) => boolean)[];
    };
    password: {
      value: string;
      valid: boolean;
      touched: boolean;
      hided: boolean;
      validators: ((value: string) => boolean)[];
    };
  };
  formIsValid: boolean;
}

const LoginPage = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [state, setState] = useState<ILogin>({
    loginForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        hided: true,
        validators: [required, length],
      },
    },
    formIsValid: false,
  });
  const [isHelp, setIsHelp] = useState(false);
  const [buttonText, setButtonText] = useState("Войти");

  const inputChangeHandler = (synteticE: React.ChangeEvent<HTMLInputElement>) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id as keyof ILogin['loginForm'];
    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.loginForm[input as keyof ILogin['loginForm']].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName  in updatedForm) {
        formIsValid = formIsValid && !!updatedForm[inputName as keyof ILogin['loginForm']].valid;
      }
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  const inputBlurHandler = (synteticE: React.FocusEvent<HTMLInputElement>) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id as keyof ILogin['loginForm'];

    if (!value) {
      return (synteticE.target.placeholder = `Enter ${input}`);
    }

    setState((prevState) => {
      return {
        ...prevState,
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            touched: true,
          },
        },
      };
    });
  };

  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!state.formIsValid) {
      if (!state.loginForm.email.touched) {
        setButtonText("Введите Емэйл");
        // console.log("toched");
      }
      return;
    }
    const authData = {
      email: state.loginForm.email.value.toLowerCase(),
      password: state.loginForm.password.value,
    };
    dispatch(login(authData, history));
  };

  const eyeHandler = (synteticE: React.MouseEvent<HTMLElement>) => {
    const target = synteticE.target as any;
    const input = target!.previousSibling.id as keyof ILogin['loginForm'];
    setState((prevState) => {
      return {
        ...prevState,
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            hided: !prevState.loginForm.password.hided,
          },
        },
      };
    });
  };

  const submitTestHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const authData = {
      email: "test@test.ru",
      password: "123456",
    };

    dispatch(login(authData, history));
  };

  const questionEnterHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHelp(true);
  };

  const questionLeaveHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHelp(false);
  };

  return (
    <div className={"popupLogin"}>
      <div className={"loginSection"}>
        <div className={"loginBlock"}>
          <form className={"loginForm"}>
            <Input
              type="text"
              id="email"
              placeholder="Enter E-mail"
              autocomplete="email"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={false}
              onChange={inputChangeHandler}
            />
            <Input
              type={state.loginForm.password.hided ? "password" : "text"}
              id="password"
              placeholder="Enter password"
              autocomplete="current-password"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={true}
              hided={state.loginForm.password.hided}
              onChange={inputChangeHandler}
              eyeClick={eyeHandler}
            />
            <button className="inputButton" onClick={submitHandler} disabled={!state.formIsValid}>
              {" "}
              {buttonText}{" "}
            </button>
          </form>

          <div className={"testForm"}>
            <button className={"subButton"} onClick={submitTestHandler}>
              <p className={"subButtText"}> Быстрый вход </p>
            </button>
            <div className={"questionMark"} onMouseEnter={questionEnterHandler} onMouseLeave={questionLeaveHandler}>
              ?
            </div>
            {isHelp && (
              <div className={"helpBlock"}>
                Автовход под тестовой почтой. <br />
                Возможно, кто-то уже пользовался.{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
