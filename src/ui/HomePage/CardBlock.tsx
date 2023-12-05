import React from "react";
import { Link } from "react-router-dom/";

type TProps = { isToken: boolean };

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
    <Link to="/" className="joinCard">
      <p className="joinText">Профиль</p>
    </Link>
    <Link to="/userfeed" className="joinCard">
      <p className="joinText">Лента</p>
    </Link>
  </div>
);

const JoinBlock: React.FunctionComponent<TProps> = ({ isToken }) => {
  return <div className="joinSection">{!isToken ? joinBlock : loggedBlock}</div>;
};

export default JoinBlock;
