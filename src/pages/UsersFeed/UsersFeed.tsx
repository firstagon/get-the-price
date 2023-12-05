import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showNotice } from "../../store/notice-actions";
import { getItems } from "../../store/items-actions";
import ItemsList from "../../ui/itemsList/ItemsList";
import { FEED_URL } from "../../links";
import NotFound from "../NotFound";
import { AppDispatch, RootState } from "../../store/store";

const UsersFeed = () => {
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.userState);
  const items = useSelector((state: RootState) => state.itemsState.items);

  useEffect(() => {
    if (!userState.token) {
      return;
    }

    dispatch(getItems(userState.token));
  }, [userState.token, dispatch]);

  return (
    <section className={"feedSection"}>
      <div className={"feedBlock"}>
        <ul className={"feedList"}>
          {!userState.userId && <NotFound type="needUser" />}
          {!!items && <ItemsList items={items} token={userState.token} />}
          {/* <ItemsList items={_state} />  */}
        </ul>
      </div>
    </section>
  );
};

export default UsersFeed;
