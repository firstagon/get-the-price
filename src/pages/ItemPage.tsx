import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItem } from "../store/items-actions";

import ItemInfo from "../ui/ItemCardUI/ItemInfo";
import InfoGraphic from "../ui/ItemCardUI/InfoGraphic";
// @ts-ignore
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import NotFound from "./NotFound";

import { RootState, AppDispatch } from "../store/store";

const ItemPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.userState);
  const item = useSelector((state: RootState) => state.itemsState.item);

  const params = useParams();
  const itemId: string = params.itemId;

  // console.log(item?.data.itemPrice)

  useEffect(() => {
    if (!!userState.token) {
      dispatch(setItem(itemId, userState.token));
    }
  }, [userState.token, itemId, dispatch]);

  return (
    <div className={"itemPage"}>
      {!item && !userState.token && <NotFound type="needUser" />}
      {!!item && (
        <div className={"mainInfo"}>
          <div className={"mainContainer"}>
            <div className={"container"}>
              <ItemInfo state={item.data} />
            </div>
          </div>
        </div>
      )}
      {!!item ? <InfoGraphic array={item.data.itemPrice} /> : ""}
    </div>
  );
};

export default ItemPage;
