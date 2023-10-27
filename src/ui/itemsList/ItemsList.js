import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UitFavorite from '../../icons/iconsItems/favStar';
import { useDispatch } from 'react-redux';
import { setFavorite } from "../../store/items-actions";

const ItemList = ({ items, token }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const itemHandler = (e, code) => {
    history.push(`item/${code}`);
  };

  const setFav = (e, itemCode, fav) => {
    e.stopPropagation();
    dispatch(setFavorite(itemCode, fav, token));
  }

  return items.map((el) => {
    if (!el.data) {
      return "";
    }

    const itemImage = el.data.imageUrl;

    return (
      <li
        className={"itemSection"}
        key={items.indexOf(el)}>
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
