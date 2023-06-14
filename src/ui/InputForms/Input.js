import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const {
    label,
    type,
    id,
    placeholder,
    onFocus,
    onBlur,
    eyeClick,
    onChange,
    eye,
    eyeToggle,
  } = props;
  return (
    <div className={classes.flexInput}>
      <label htmlFor={id} className={classes.inputLabel}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type={eyeToggle ? 'text' : type}
        placeholder={placeholder}
        className={classes.inputInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      {eye && (
        <i
          className={classes.eye + " " + (eyeToggle ? classes.eyeOpen : "")}
          onClick={eyeClick}
        />
      )}
    </div>
  );
});

export default Input;
