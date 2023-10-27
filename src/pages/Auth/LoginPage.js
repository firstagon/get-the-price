import { useState } from "react";

import Input from "../../ui/InputForms/Input";
import { required, length, email } from "../../util/validators";
import { useDispatch } from 'react-redux';
import { login } from "../../store/login-actions";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
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

  const inputChangeHandler = (synteticE) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id;
    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.loginForm[input].validators) {
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
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && !!updatedForm[inputName].valid;
      }
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  const inputBlurHandler = (synteticE) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id;

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

  const submitHandler = (e) => {
    e.preventDefault();

    if (!state.formIsValid) {
      if (!state.loginForm.email.touched) {
        setButtonText("Введите Емэйл");
        // console.log("toched");
      }
      return;
    }
    const authData = {
      email: state.loginForm.email.value,
      password: state.loginForm.password.value,
    }
    dispatch(login(authData, props.history));
  };

  const eyeHandler = (synteticE) => {
    const input = synteticE.target.previousSibling.id;
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

  const submitTestHandler = (e) => {

    e.preventDefault();
    const authData = {
      email: "test@test.ru",
      password: "123456",
    };

    dispatch(login(authData, props.history));

    props.history.push('/');
  };

  const questionEnterHandler = (e) => {
    e.preventDefault();
    setIsHelp(true);
  };

  const questionLeaveHandler = (e) => {
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
              autocomplete='email'
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={false}
              onChange={inputChangeHandler}
            />
            <Input
              type={state.loginForm.password.hided ? "password" : "text"}
              id="password"
              placeholder="Enter password"
              autocomplete='current-password'
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={true}
              hided={state.loginForm.password.hided}
              onChange={inputChangeHandler}
              eyeClick={eyeHandler}
            />
            <button
              className="inputButton"
              onClick={submitHandler}
              disabled={!state.formIsValid}
            >
              {" "}
              {buttonText}{" "}
            </button>
          </form>

          <div className={"testForm"}>
            <button className={"subButton"} onClick={submitTestHandler}>
              <p className={"subButtText"}> Быстрый вход </p>
            </button>
            <div
              className={"questionMark"}
              onMouseEnter={questionEnterHandler}
              onMouseLeave={questionLeaveHandler}
            >
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
