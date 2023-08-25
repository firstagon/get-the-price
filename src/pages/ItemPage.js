import React, { useState, useEffect } from "react";

import FavoriteSlider from "../ui/FavoriteSlider";
import ItemActions from "../ui/ItemActions";
import ItemInfo from "../ui/ItemCardUI/ItemInfo";
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

  // console.log({...userState})

  const [state, setState] = useState(false);

  const getItem = (itemCode) => {
    // console.log('trying to fetch')
    // console.log(ITEM_URL + itemCode);
    fetch(ITEM_URL + itemCode, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      Authorization: `Basic ${userState.token}`,
      body: JSON.stringify({ ...userState, itemId }),
    })
      .then((res) => {
        // console.log(res.status)
        return res.json();
      })
      .then((res) => {
        // console.log(res)
        setState(() => {
          return { ...res, status: !!res ? "ok" : "error, failed to fetch" };
        });
      })
      .catch((err) =>
        setState(() => {
          return { status: "error" };
        })
      );
  };

  useEffect(() => {
    // console.log('effect')
    if (userState.token) {
      getItem(itemId);
    }
    // getItem(itemId);
  }, [userState.token]);

  // console.log(state);
  // console.log(userState);

  return (
    <div className={'itemPage'}>
      <section className={'mainInfo'}>
        <div className={'mainContainer'}>
          {state.status === "ok" ? (
            <div className={'container'}>
              {/* <ItemCard state={state.data} />  */}
              <ItemInfo state={state.data} /> 
              {/* <ItemActions />  */}
              {/* <FavoriteSlider /> */}
            </div>
          ) : <p className="errorMessage"> Error: connection failed </p>}
        </div>
      </section>
      {state.status === "ok" ? (
        <InfoGraphic array={state.data.itemPrice} />
      ) : (
        ""
      )}
      
    </div>
  );
};

export default ItemPage;
