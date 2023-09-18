import React, { useState, useEffect } from "react";

import FavoriteSlider from "../ui/FavoriteSlider";
import ItemActions from "../ui/ItemActions";
import ItemInfo from "../ui/ItemCardUI/ItemInfo";
import InfoGraphic from "../ui/ItemCardUI/InfoGraphic";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ITEM_URL } from '../links';
import NotFound from '../pages/NotFound';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "fetchData":
//       break;

//     default:
//       break;
//   }
// };

const ItemPage = ({ userState, history, showStatus }) => {
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
        showStatus.status('loading');
        if (res.status === 404) {
          showStatus.status('error');
          setState(() => {
            return { status: 404 }
          })
          return
        }
        // console.log(res.status)
        return res.json();
      })
      .then((res) => {
        showStatus.status('loaded');
        // console.log(res)
        setState(() => {
          return { ...res, status: !!res ? 200 : "error, failed to fetch" };
        });
      })
      .catch((err) => {
        showStatus.status('error');
        showStatus.onError({message: err.message, name: 'Ошибка подключение к серверу'});
        setState(() => {
          return { status: 404 };
        })
      }
      );
  };

  useEffect(() => {
    // console.log('effect')
    if (userState.token) {
      getItem(itemId);
    }
    // getItem(itemId);
  }, [userState.token, itemId]);

  // console.log(state);
  // console.log(userState);

  return (
    <div className={'itemPage'}>
      {!state.data && <NotFound history={history} />}
      {state.status === 200 &&
        <div className={'mainInfo'}>
          <div className={'mainContainer'}>
            <div className={'container'}>
              {/* <ItemCard state={state.data} />  */}
              <ItemInfo state={state.data} />
              {/* <ItemActions />  */}
              {/* <FavoriteSlider /> */}
            </div>
          </div>
        </div>
      }
      {state.status === 200 ? (
        <InfoGraphic array={state.data.itemPrice} />
      ) : (
        ""
      )}

    </div>
  );
};

export default ItemPage;
