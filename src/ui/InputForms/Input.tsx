// import classes from "./Input.module.css";
import React from "react";

interface IInputProps {
  type: string;
  placeholder?: string;
  eyeClick?: any;
  label?: string;
  id?: string;
  eye?: boolean;
  hided?: boolean;
  autocomplete?: any;
  onFocus?:  (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?:  (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  eyeToggle?: (e: React.SyntheticEvent) => void;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const { label, type, id, placeholder, onFocus, onBlur, eyeClick, onChange, eye, hided, eyeToggle, autocomplete } =
    props;
  return (
    <div className={"flexInput"}>
      <label htmlFor={id} className={"inputLabel"}>
        {label}
      </label>
      <div className={"inputBlock"}>
        <input
          id={id}
          autoComplete={autocomplete}
          type={eyeToggle ? "text" : type}
          placeholder={placeholder}
          className={"inputInput"}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        {eye && <i className={"eye " + (hided ? "" : "eyeOpen")} onClick={eyeClick} />}
      </div>
    </div>
  );
};

export default Input;
