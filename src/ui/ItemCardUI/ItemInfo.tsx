import React from "react";
import { Link } from "react-router-dom";

import type { TItemPrice } from "./InfoGraphic";
import type { TItem } from "../../store/items-slice";

const currPrice = <T extends TItemPrice[]>(arr: T) => {
  for (let i = 1; i <= arr.length; i++) {
    if (!!arr.slice(-i)[0].price !== false) {
      return arr.slice(-i)[0].price;
    }
  }
};

const ItemInfo: React.FunctionComponent<{ state: TItem["data"] }> = ({ state }) => {
  const priceChanger = (prices: TItemPrice[]) => {
    if (prices.length <= 1) {
      return prices;
    }

    const lastPrices = prices.slice(-2);
    const difference = lastPrices[0].price - lastPrices[1].price;
    return difference > 0;
  };

  const changeInicator = priceChanger(state.itemPrice);
  const priceChange = changeInicator ? "_down" : "_up";

  return (
    <React.Fragment>
      <section className={"itemContainer"}>
        <div className={"ContainerInfoImage"}>
          <img className={"itemImage"} src={state.imageUrl} alt="how item looks"></img>
          <div className={"itemPriceSection"}>
            <div className={"itemPrice " + priceChange}>
              {currPrice(state.itemPrice)} P {changeInicator ? "DOWN" : "UP"}
            </div>
            <Link className={"linkText"} to={{ pathname: state.itemUrl }} target="_blank">
              {" "}
              Страница товара{" "}
            </Link>
          </div>
        </div>

        <div className={"ContainerInfoText"}>
          <h2 className={"itemTitle"}> {state.itemName} </h2>
          <p className={"itemDesc"}> {state.desc} </p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ItemInfo;
