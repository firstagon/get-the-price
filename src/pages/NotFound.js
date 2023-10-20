import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = ({ type }) => {
    const tp = type ? type : '';

    switch (tp) {
        case 'needUser':
            return <section className="notfound">
                <div className="notfoundBlock">
                    <h4 className="notfoundHeader"> Вы изменились </h4>
                    <p className="notfoundText"> Для доступа к ленте товаров, необходимо войти в систему </p>
                    <Link className='linkText' to='/'> Вернуться на главную страницу </Link>
                    <div className="notfoundLinks">
                        <Link className='linkText margin' to='/signup'> Регистрация </Link>
                        <Link className='linkText margin' to='/login'> Вход </Link>
                    </div>

                </div>
            </section>


        default:
            return <section className="notfound">
                <div className="notfoundBlock">
                    <h4 className="notfoundHeader"> Страница не найдена </h4>
                    <p className="notfoundText"> Страницы не существует </p>
                    <Link className='linkText' to='/'> Вернуться на главную страницу </Link>
                </div>
            </section>

    }


}

export default NotFound;