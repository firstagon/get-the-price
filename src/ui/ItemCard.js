import classes from "./ItemCard.module.css";
import ItemInfo from "./ItemCardUI/ItemInfo";

const ItemCard = ({state}) => {
  return (
    <div className={classes.container}>
      <ItemInfo state={state} />
    </div>
  );
};

export default ItemCard;
