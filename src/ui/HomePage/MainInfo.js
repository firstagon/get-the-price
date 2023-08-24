import MainInfoBlock from "./MainInfoBlock";

import registration from '../../img/registration.png';
import search from '../../img/searching.png';
import clock from '../../img/clock.png';
import addingItems from '../../img/addeditems.png';
import end from '../../img/end.png';



const textArray = [
  {
    header: "Зачем нужна регистрация",
    text: "Регистрируемся, чтобы не потерять свою выборку.",
    imgSrc: registration,
    reversed: false,
  },
  {
    header: "",
    text: "Переходим на сайт и копируем ссылку.",
    imgSrc: search,
    reversed: true,
  },
  {
    header: "",
    text: "Добавляем к себе в список отслеживаемых товаров.",
    imgSrc: addingItems,
    reversed: false,
  },
  {
    header: "",
    text: "Ждем когда цена станет приемлимого уровня.",
    imgSrc: clock,
    reversed: true,
  },
];

const endBlock = (
  <div className="infoBlock_text">
    <div className={`infoBlock_infoEnd`}>
      <div className={"infoImg_container"}>
        <img className="infoImg" src={end} alt="imaginate this" />
      </div>
      <p className={"infoText_column"}> Готово! Вы восхитительны! </p>
    </div>
  </div>
);

const MainInfo = () => {
  return (
    <section className={"infoSection"}>
      <div className={"infoBlock"}>
        <div className={"infoBlock_text"}>
          <h1 className={"headerMain"}> Как это работает? </h1>
          <p className="infoText centeredText">
            {" "}
            Огромное количество товаров продается на марткеплейсах. Не меньшее
            количество проводимых скидок, акций и "цен дня" проходит мимо людей,
            не проводящих ежедневный мониторинг интересующих их вещей. Усилиями
            маркетологов цена товара может существенно отличаться в ту или иную
            сторону в зависимости от дня недели, месяца и времени года.
          </p>
          <p className="infoText centeredText">
            Благодаря простейшему трекеру цены можно получить уведомление о
            изменении цены и совершить покупку по подходящей для вас цене.
          </p>
        </div>
        {textArray.map((el) => (
          <MainInfoBlock key={textArray.indexOf(el)} info={el} />
        ))}
        {endBlock}
      </div>
    </section>
  );
};

export default MainInfo;
