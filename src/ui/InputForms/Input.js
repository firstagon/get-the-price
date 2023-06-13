import classes from "./Input.module.css";

const Input = ({ label, type, id, placeholder, onFocus, onBlur, eye }) => {
  return (
    <div className={classes.flexInput}>
      <label htmlFor={id} className={classes.inputLabel}>
        {label}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={classes.inputInput}
          onFocus={onFocus}
          onBlur={onBlur}
          eye={eye}
        />
        {eye && (
          <i
            className={classes.eye }

          />
        )}
      </label>
    </div>
  );
};

export default Input;
