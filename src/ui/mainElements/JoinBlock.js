import { Link } from "react-router-dom/cjs/react-router-dom.min";

const JoinBlock = () => {
  const clickHandler = (e) => {
    console.log(e)
  }

  return (
    <div className="joinSection">
      <div className="joinBlock">
        <Link to="/signup" className="joinCard">
          <p  className="joinText" onClick={clickHandler}> Sign up </p>
        </Link>
        <Link to="/login" className="joinCard">
          <p className="joinText" onClick={clickHandler}> Sign ip </p>
        </Link>
      </div>
    </div>
  );
};

export default JoinBlock;
