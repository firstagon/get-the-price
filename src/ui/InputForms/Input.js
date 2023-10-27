// import classes from "./Input.module.css";

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
    autocomplete,
  } = props;
  return (
    <div className={'flexInput'}>
      <label htmlFor={id} className={'inputLabel'}>
        {label}
      </label>
      <div className={'inputBlock'}>
        <input
          id={id}
          autoComplete={autocomplete}
          type={eyeToggle ? "text" : type}
          placeholder={placeholder}
          className={'inputInput'}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        {eye && (
          <i
            className={'eye' + " " + (hided ? "" : 'eyeOpen')}
            onClick={eyeClick}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
