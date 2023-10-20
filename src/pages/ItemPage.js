import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { showNotice } from "./../store/notice-actions";

import FavoriteSlider from "../ui/FavoriteSlider";
import ItemActions from "../ui/ItemActions";
import ItemInfo from "../ui/ItemCardUI/ItemInfo";
import InfoGraphic from "../ui/ItemCardUI/InfoGraphic";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ITEM_URL } from '../links';
import NotFound from '../pages/NotFound';


const ItemPage = ({ showStatus }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const params = useParams();
  const itemId = params.itemId;

  const [state, setState] = useState(false);

  const getItem = (itemCode) => {

    fetch(ITEM_URL + itemCode, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `${userState.token}`
      },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => {
        // showStatus.status('loading');
        if (res.status === 404) {
          dispatch(showNotice('error'));
          setState(() => {
            return { status: 404 }
          })
          return
        }
        return res.json();
      })
      .then((res) => {
        // showStatus.status('loaded');
        setState(() => {
          return { ...res, status: !!res ? 200 : "error, failed to fetch" };
        });
      })
      .catch((err) => {
        dispatch(showNotice('error'))
        setState(() => {
          return { status: 404 };
        })
      }
      );
  };

  useEffect(() => {
    if (userState.token) {
      getItem(itemId);
    }
  }, [userState.token, itemId]);

  return (
    <div className={'itemPage'}>
      {!state.data && <NotFound />}
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
