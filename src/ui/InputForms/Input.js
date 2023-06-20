import classes from "./Input.module.css";

const Input = (props) => {
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
    hided,
    eyeToggle,
    higlited
  } = props;
  return (
    <div className={classes.flexInput}>
      <label htmlFor={id} className={classes.inputLabel}>
        {label}
      </label>
      <input

        id={id}
        type={eyeToggle ? "text" : type}
        placeholder={placeholder}
        className={classes.inputInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      {eye && <i
        className={classes.eye + " " + (hided ? "" : classes.eyeOpen)}
        onClick={eyeClick}
      />}
    </div>
  );
};

export default Input;
