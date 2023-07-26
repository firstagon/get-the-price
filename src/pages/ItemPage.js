import React, { useState } from "react";
import classes from "./ItemPage.module.css";
import FavoriteSlider from "../ui/FavoriteSlider";
import ItemCard from "../ui/ItemCard";
import ItemActions from "../ui/ItemActions";
import InfoGraphic from "../ui/ItemCardUI/InfoGraphic";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ITEM_URL = "http://127.0.0.1:3030/item/";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "fetchData":
//       break;

//     default:
//       break;
//   }
// };

const ItemPage = ({ userState }) => {
  const params = useParams();
  const itemId = params.itemId;

  // const [state, dispatch] = useState(reducer, { user: userState });


  const getItem = (itemCode) => {
    fetch(ITEM_URL + itemCode, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      Authorization: `Basic ${userState.token}`,
      body: JSON.stringify({...userState}),
    });
  };

  getItem()

  console.log(itemId);
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
