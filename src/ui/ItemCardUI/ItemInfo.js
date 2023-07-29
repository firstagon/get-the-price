import React from "react";
import classes from "./ItemInfo.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ItemInfo = ({ state }) => {
  // console.log(state);

  const priceChanger = (prices) => {
    const lastPrices = prices.slice(-2);
    const difference = lastPrices[0].price - lastPrices[1].price;
    return difference > 0;
  };

  const changeInicator = priceChanger(state.itemPrice);
  const priceChange = changeInicator ? classes._down : classes._up;

  return (
    <React.Fragment>
      <section className={classes.container}>
        <div className={classes.ContainerInfoImage}>
          <img className={classes.itemImage} src={state.imageUrl} alt="how item looks"></img>
          <div className={classes.itemPriceSection}>
            <div className={classes.itemPrice + " " + priceChange}> {state.itemPrice.slice(-1)[0].price} {changeInicator ? "DOWN" : "UP"}</div>
            <Link className={classes.linkText} to={{pathname: state.itemUrl}} target='_blank'> Страница товара  </Link>
          </div>
        </div>

        <div className={classes.ContainerInfoText}>
          <h2 className={classes.itemTitle}> {state.itemName} </h2>
          <div className={classes.itemDesc}> {state.desc} </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ItemInfo;
