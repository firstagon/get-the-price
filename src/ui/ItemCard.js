import classes from "./ItemCard.module.css";
import ItemInfo from "./ItemCardUI/ItemInfo";

const ItemCard = (props) => {
  return (
    <div className={classes.container}>
      <ItemInfo />
    </div>
  );
};

export default ItemCard;
