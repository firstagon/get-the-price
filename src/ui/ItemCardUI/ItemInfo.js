import React from "react";
import classes from "./ItemInfo.module.css";

const ItemInfo = (props) => {
  
  const priceChange = false ? classes._down : classes._up;

  return (
    <React.Fragment>
      <section className={classes.container}>
        <div className={classes.ContainerInfoImage}>
          <img
            className={classes.itemImage}
            src="#"
            alt="Items look"
          ></img>
          <div className={classes.itemPriceSection}>
            <div className={classes.itemPrice + ' ' + priceChange}> 1046 </div>
            <div className={classes.itemChangeImage}> UP </div>
          </div>
        </div>

        <div className={classes.ContainerInfoText}>
          <h2 className={classes.itemTitle}> Smth </h2>
          <div className={classes.itemDesc}> So good. So smooth. </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ItemInfo;
