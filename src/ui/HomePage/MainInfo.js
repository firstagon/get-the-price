import MainInfoBlock from "./MainInfoBlock";

const textArray = [
  {
    header: "Зачем нужна регистрация",
    text: "Регистрируемся, чтобы не потерять свою выборку.",
    imgSrc: "#",
    reversed: false,
  },
  {
    header: "",
    text: "Переходим на сайт и копируем ссылку.",
    imgSrc: "#",
    reversed: true,
  },
  {
    header: "",
    text: "Добавляем к себе в список отслеживаемых товаров.",
    imgSrc: "#",
    reversed: false,
  },
  {
    header: "",
    text: "Ждем когда цена станет приемлимого уровня.",
    imgSrc: "#",
    reversed: true,
  },
];

const endBlock = (
  <div className="infoBlock_text">
    <div className={`infoBlock_infoEnd`}>
      <div className={"infoImg_container"}>
        <img className="infoImg" src='#' alt="imaginate this" />
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
          <p className="infoText">
            {" "}
            Огромное количество товаров продается на марткеплейсах. Не меньшее
            количество проводимых скидок, акций и "цен дня" проходит мимо людей,
            не проводящих ежедневный мониторинг интересующих их вещей. Усилиями
            маркетологов цена товара может существенно отличаться в ту или иную
            сторону в зависимости от дня недели, месяца и времени года.
          </p>
          <p className="infoText">
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
