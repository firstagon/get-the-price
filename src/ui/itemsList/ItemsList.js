import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from "./ItemList.module.css";

const ItemList = ({ items }) => {

  const [state, setState] = useState([...items])
  const history = useHistory();

  // console.log(state)

  const itemHandler = (e, code) => {
    // console.log(code);
    history.push(`item/${code}`)
    
  }


  return items.map((el) => {
    if(!el.data) {
      return '';
    }
    const itemImage = el.data.imageUrl;
    return (
      <li className={classes.itemSection} key={items.indexOf(el)} onClick={(e) => itemHandler(e, el.itemCode)}>
        <div className={classes.itemBlock}>
          <img className={classes.itemImage} src={itemImage} alt="" />
          <div className={classes.itemBlock_info}>
            <h4 className={classes.itemName}> {el.itemName} </h4>
            <div className={classes.itemInfo}>
              <div className={classes.itemInfo_left}>
                <div className={classes.rating}> {el.data.itemRating} </div>
                <div className={classes.price}> {el.lastPrice} ₽ </div>
              </div>
              <div className={classes.itemInfo_right}>
                Обновлено: {el.updated}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });
};


export default ItemList;
