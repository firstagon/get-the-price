import { Link } from "react-router-dom/cjs/react-router-dom.min";

const joinBlock = (
  <div className="joinBlock">
    <Link to="/signup" className="joinCard">
      <p className="joinText"> Регистрация </p>
    </Link>
    <Link to="/login" className="joinCard">
      <p className="joinText"> Вход </p>
    </Link>
  </div>
);

const loggedBlock = (
  <div className="joinBlock">
    <Link to="/profile" className="joinCard">
      <p className="joinText">Профиль</p>
    </Link>
    <Link to="/userfeed" className="joinCard">
      <p className="joinText">Лента</p>
    </Link>
  </div>
);

const JoinBlock = ({ isToken }) => {
  return <div className="joinSection">{!isToken ? joinBlock : loggedBlock}</div>;
};

export default JoinBlock;
