const ItemList = ({ items }) => {
  // console.log(items)
  return items.map((el) => {
    return <li key={items.indexOf(el)}>{el.itemName}</li>;
  });
};

export default ItemList;
