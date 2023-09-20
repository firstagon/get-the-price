import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UitFavorite from '../../icons/iconsItems/favStar';
import { ITEM_FAV } from '../../links';

const testItem = [
  {
    itemImage: "#",
    itemName: "Test itemname",
    lastPrice: 30125,
    updated: new Date().toLocaleString(),
    data: {
      itemRating: 4.2,
      imageUrl: "#",
    },
  },
];

const ItemList = ({ items, getRequest }) => {
  const [state, setState] = useState(items);
  // console.log(state)
  const history = useHistory();

  // console.log(state)

  const itemHandler = (e, code) => {
    // console.log(e.target)
    history.push(`item/${code}`);
  };

  const setFav = (e, itemCode, fav) => {
    e.stopPropagation();

    fetch(ITEM_FAV, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        itemCode,
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
        isFav: !fav,
      }),
    }).then(getRequest())
      .then(console.log(state)).catch(err => console.log(err));
  }

  useEffect(() => {
    setState(items);
  }, [items])

  return state.map((el) => {
    if (!el.data) {
      return "";
    }
    const itemImage = el.data.imageUrl;
    return (
      <li
        className={"itemSection"}
        key={state.indexOf(el)}>
        <div className={"itemBlock"} onClick={(e) => itemHandler(e, el.itemCode)}>
          <img className={"feedImage"} src={itemImage} alt="how good looks" />
          <div className={"itemBlock_info"}>
            <div className={"itemInfo rowAlways"}>
              <h4 className={"itemName"}> {el.itemName} </h4>
              <UitFavorite className='favIcon' isfav={!!el.favorite ? 'true' : 'false'}
                onClick={e => setFav(e, el.itemCode, el.favorite)} />
            </div>
            <div className={"itemInfo"}>
              <div className={"itemInfo_left"}>
                <span className="rating"> {el.data.itemRating} </span>
                <span className="price"> {el.lastPrice ? `${el.lastPrice} ₽` : 'Закончился'} </span>
              </div>
              <span className={"itemInfo_right"}>Обновлено: {el.updated}</span>
            </div>
          </div>
        </div>
      </li>
    );
  });
};


export default ItemList;
