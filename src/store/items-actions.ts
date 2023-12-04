import { itemsActions as state } from "./items-slice";
import { FEED_URL, ITEM_FAV, ITEM_URL } from "../links";
import { showNotice } from "./notice-actions";
import type { AppDispatch } from "./store";
import type { TItem } from "./items-slice";

type TRes = {
  data?: TItem[];
};

const sortByFav = (res: TRes) => {
  let data;
  if (!!res.data) {
    data = res.data.map((el) => {
      if (!el.favorite) {
        return (el = { ...el, favorite: false });
      } else {
        return el;
      }
    });
  } else {
    data = (res as Array<TItem>).map((el: TItem) => {
      if (!el.favorite) {
        return (el = { ...el, favorite: false });
      } else {
        return el;
      }
    });
  }
  const sorted = data.sort((a: TItem, b: TItem) => Number(b.favorite) - Number(a.favorite));
  return sorted;
};

export const getItems = (token: string) => {
  return async (dispatch: AppDispatch) => {
    fetch(FEED_URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const sorted = sortByFav(res);
        dispatch(state.setItems([...sorted]));
      })
      .catch((err) => dispatch(showNotice("error")));
  };
};

export const setFavorite = (itemCode: number, fav: boolean, token: string) => {
  return (dispatch: AppDispatch) => {
    let promise = new Promise((resolve, reject) => {
      resolve(dispatch(state.setfavorite({ itemCode })));
    });

    promise.then(() => {
      fetch(ITEM_FAV, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: token,
        }),
        body: JSON.stringify({
          itemCode,
          userId: localStorage.getItem("userId"),
          isFav: !fav,
        }),
      });
    });
    promise.catch((err) => dispatch(showNotice("errorToFavorite")));
  };
};

export const setItem = (itemId: string, token: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(state.clearItem(null));

    fetch(ITEM_URL + itemId, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      // body: JSON.stringify({ itemId }),
    })
      .then((res) => {
        // showStatus.status('loading');
        if (res.status === 404) {
          dispatch(showNotice("error"));
          return;
        }
        return res.json();
      })
      .then((res) => {
        dispatch(state.setItem({ ...res }));
      })
      .catch((err) => {
        dispatch(showNotice("error"));
      });
  };
};
