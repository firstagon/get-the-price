import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setItem } from "../store/items-actions";

import ItemInfo from "../ui/ItemCardUI/ItemInfo";
import InfoGraphic from "../ui/ItemCardUI/InfoGraphic";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import NotFound from '../pages/NotFound';


const ItemPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const item = useSelector(state => state.itemsState.item);

  const params = useParams();
  const itemId = params.itemId;

  useEffect(() => {
    if (!!userState.token) {
      dispatch(setItem(itemId, userState.token));
    }
  }, [userState.token]);

  return (
    <div className={'itemPage'}>
      {!item && !userState.token && <NotFound />}
      {!!item &&
        <div className={'mainInfo'}>
          <div className={'mainContainer'}>
            <div className={'container'}>
              <ItemInfo state={item.data} />
            </div>
          </div>
        </div>
      }
      {!!item ? (
        <InfoGraphic array={item.data.itemPrice} />
      ) : (
        ""
      )}

    </div>
  );
};

export default ItemPage;
