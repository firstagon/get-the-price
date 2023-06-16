import classes from "./MainInfo.module.css";

const MainInfo = () => {
  return (
    <section className={classes.infoSection}>
      <div className={classes.infoBlock}>
        <div className={classes.infoBlock_text}>
          <h1 className={classes.headerMain}> Как это работает? </h1>
          <p>
            {" "}
            Огромное количество товаров продается на марткеплейсах. Не меньшее
            количество проводимых скидок, акций и "цен дня" проходит мимо людей,
            не проводящих ежедневный мониторинг интересующих их вещей. Усилиями
            маркетологов цена товара может существенно отличаться в ту или иную
            сторону в зависимости от дня недели, месяца и времени года.
          </p>
          <p>
            Благодаря простейшему трекеру цены можно получить уведомление о
            изменении цены и совершить покупку по подходящей для вас цене.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainInfo;
