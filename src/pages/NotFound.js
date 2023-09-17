import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = ({history}) => {
    return <section className="notfound">
        <div className="notfoundBlock">
            <h4 className="notfoundHeader"> Страница не найдена </h4>
            <p className="notfoundText"> Страницы не существует </p>
            <Link className='linkText' to='/'> Вернуться на главную страницу </Link>
        </div>
    </section>
}

export default NotFound;