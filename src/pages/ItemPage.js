import React, { useState, useEffect } from "react";
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

  const [state, setState] = useState(false);

  const getItem = (itemCode) => {
    // console.log(ITEM_URL + itemCode);
    fetch(ITEM_URL + itemCode, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...userState, itemId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(() => {
          return res;
        });
      });
  };

  useEffect(() => {
    if (userState.token) {
      getItem(itemId);
    }
  }, [userState.token]);

  // console.log(state);
  // console.log(userState);

  return (
    <div className={classes.page}>
      <section className={classes.mainInfo}>
        <div className={classes.mainContainer}>
          <div className={classes.container}>
            {!!state ? <ItemCard state={state.data} /> : ""}
            <ItemActions />
          </div>
        </div>
      </section>
      {!!state ? <InfoGraphic array={state.data.itemPrice} /> : ""}
      <FavoriteSlider />
    </div>
  );
};

export default ItemPage;
