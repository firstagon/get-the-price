import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

const ItemList = ({ items }) => {
  // const [state, setState] = useState([...items])
  const history = useHistory();

  // console.log(state)

  const itemHandler = (e, code) => {
    // console.log(code);
    history.push(`item/${code}`);
  };

  return testItem.map((el) => {
    if (!el.data) {
      return "";
    }
    const itemImage = el.data.imageUrl;
    return (
      <li
        className={"itemSection"}
        // key={items.indexOf(el)}
        key={testItem.indexOf(el)}
        onClick={(e) => itemHandler(e, el.itemCode)}
      >
        <div className={"itemBlock"}>
          <img className={"itemImage"} src={itemImage} alt="" />
          <div className={"itemBlock_info"}>
            <h4 className={"itemName"}> {el.itemName} </h4>
            <div className={"itemInfo"}>
              <div className={"itemInfo_left"}>
                <div className={"rating"}> {el.data.itemRating} </div>
                <div className={"price"}> {el.lastPrice} ₽ </div>
              </div>
              <div className={"itemInfo_right"}>Обновлено: {el.updated}</div>
            </div>
          </div>
        </div>
      </li>
    );
  });
};

export default ItemList;
