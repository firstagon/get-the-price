import React from "react";
import classes from "./ItemPage.module.css";
import FavoriteSlider from "../ui/FavoriteSlider";
import ItemCard from "../ui/ItemCard";
import ItemActions from "../ui/ItemActions";
import InfoGraphic from "../ui/ItemCardUI/InfoGraphic";

const ItemPage = (props) => {
  return (
    <div className={classes.page}>
      <section className={classes.mainInfo}>
        <div className={classes.mainContainer}>
          <div className={classes.container}>
            <ItemCard />
            <ItemActions />
          </div>
        </div>
      </section>
      <InfoGraphic />
      <FavoriteSlider />
    </div>
  );
};

export default ItemPage;
