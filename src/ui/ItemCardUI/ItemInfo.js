import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const currPrice = (arr) => {

  for(let i=1; i<= arr.length; i++) {
    // console.log(i);
    
    if (arr.slice(-i)[0].price !== false) {
      return arr.slice(-i)[0].price
    }
  }
}

const ItemInfo = ({ state }) => {
  // console.log(state);

  const priceChanger = (prices) => {
    const lastPrices = prices.slice(-2);
    const difference = lastPrices[0].price - lastPrices[1].price;
    return difference > 0;
  };

  const changeInicator = priceChanger(state.itemPrice);
  const priceChange = changeInicator ? '_down' : '_up';

  return (
    <React.Fragment>
      <section className={'itemContainer'}>
        <div className={'ContainerInfoImage'}>
          <img className={'itemImage'} src={state.imageUrl} alt="how item looks"></img>
          <div className={'itemPriceSection'}>
            {/* <div className={'itemPrice' + " " + priceChange}> {state.itemPrice.slice(-1)[0].price} {changeInicator ? "DOWN" : "UP"}</div> */}
            <div className={'itemPrice' + " " + priceChange}> {currPrice(state.itemPrice)} {changeInicator ? "DOWN" : "UP"}</div>
            <Link className={'linkText'} to={{pathname: state.itemUrl}} target='_blank'> Страница товара  </Link>
          </div>
        </div>

        <div className={'ContainerInfoText'}>
          <h2 className={'itemTitle'}> {state.itemName} </h2>
          <div className={'itemDesc'}> {state.desc} </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ItemInfo;
