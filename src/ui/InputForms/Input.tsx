// import classes from "./Input.module.css";
import React from "react";

interface IInputProps {
  type: string;
  placeholder?: string;
  eyeClick?: any;
  label?: string;
  id?: string;
  eye?: any;
  hided?: boolean;
  autocomplete?: any;
  onFocus?:  (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onBlur?:  (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
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
        {eye && <i className={"eye" + " " + (hided ? "" : "eyeOpen")} onClick={eyeClick} />}
      </div>
    </div>
  );
};

export default Input;
