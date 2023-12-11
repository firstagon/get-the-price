import { useState } from "react";

import Input from "../../ui/InputForms/Input";
import { required, length, email } from "../../util/validators";
import { useDispatch } from "react-redux";
import { signup } from "../../store/login-actions";
import { AppDispatch } from "../../store/store";
// @ts-ignore
import { History } from "history";

interface ISignup {
  signupForm: {
    email: {
      value: string;
      valid: boolean;
      touched: boolean;
      hided?: boolean;
      validators: ((value: string) => boolean)[];
    };
    password: {
      value: string;
      valid: boolean;
      touched: boolean;
      hided: boolean;
      validators: ((value: string) => boolean)[];
    };
    passwordRepeat: {
      value: string;
      valid: boolean;
      touched: boolean;
      hided: boolean;
      validators: ((value: string) => boolean)[];
    };
  };
  formIsValid: boolean;
  passwordsSame: boolean;
}

const SignupPage: React.FunctionComponent<{ history: History }> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [state, setState] = useState({
    signupForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        hided: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        hided: true,
        validators: [required, length],
      },

      passwordRepeat: {
        value: "",
        valid: false,
        touched: false,
        hided: true,
        validators: [required, length],
      },
    },
    formIsValid: false,
    passwordsSame: false,
  });

  const higlightClass =
    state.passwordsSame && state.formIsValid
      ? "greenHighlight"
      : !state.passwordsSame &&
        !state.formIsValid &&
        state.signupForm.email.valid &&
        state.signupForm.passwordRepeat.value
      ? "redHighlight"
      : "";

  const inputChangeHandler = (synteticE: React.ChangeEvent<HTMLInputElement>) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id as keyof ISignup["signupForm"];
    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      let passwordsSame = false;
      for (const inputName in updatedForm) {
        passwordsSame = updatedForm.password.value === updatedForm.passwordRepeat.value ? true : false;
        formIsValid =
          formIsValid &&
          !!updatedForm[inputName as keyof ISignup["signupForm"]].valid &&
          updatedForm.password.value === updatedForm.passwordRepeat.value;
      }
      return {
        signupForm: updatedForm,
        passwordsSame: passwordsSame,
        formIsValid: formIsValid,
      };
    });
  };

  const inputBlurHandler = (synteticE: React.FocusEvent<HTMLInputElement>) => {
    const value = synteticE.target.value;
    const input = synteticE.target.id as keyof ISignup["signupForm"];

    if (!value) {
      return (synteticE.target.placeholder = `Enter ${input}`);
    }

    setState((prevState) => {
      return {
        ...prevState,
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };

  const eyeHandler = (synteticE: React.MouseEvent<HTMLElement>) => {
    const target = synteticE.target as any;
    const input = target.previousSibling.id as keyof ISignup["signupForm"];
    setState((prevState) => {
      return {
        ...prevState,
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            hided: !prevState.signupForm[input].hided,
          },
        },
      };
    });
  };

  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const authData = {
      email: state.signupForm.email.value,
      password: state.signupForm.password.value,
    };

    dispatch(signup(authData, props.history));
  };

  return (
    <div className={"popupLogin"}>
      <div className="loginSection">
        <div className={"loginBlock"}>
          <form className={"signupForm"}>
            <Input
              type="text"
              id="email"
              autocomplete="email"
              placeholder="Enter E-mail"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={false}
              onChange={inputChangeHandler}
            />
            <Input
              type={state.signupForm.password.hided ? "password" : "text"}
              id="password"
              placeholder="Enter password"
              autocomplete="new-password"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={true}
              hided={state.signupForm.password.hided}
              onChange={inputChangeHandler}
              eyeClick={eyeHandler}
            />
            <Input
              type={state.signupForm.passwordRepeat.hided ? "password" : "text"}
              id="passwordRepeat"
              placeholder="Enter password repeat"
              autocomplete="new-password"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={inputBlurHandler}
              eye={true}
              hided={state.signupForm.passwordRepeat.hided}
              onChange={inputChangeHandler}
              eyeClick={eyeHandler}
            />
            <button
              // eslint-disable-next-line no-useless-concat
              className={"inputButton" + " " + higlightClass}
              type="submit"
              name="submit"
              onClick={submitHandler}
              disabled={!state.formIsValid}
            >
              {state.passwordsSame && state.formIsValid
                ? "Отправить"
                : !state.passwordsSame && !state.formIsValid && state.signupForm.email.valid
                ? "Пароли должны совпадать"
                : "Заполните форму"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
