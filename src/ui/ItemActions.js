import classes from "./ItemActions.module.css";

const ItemActions = (props) => {
  return (
    <aside className={classes.container}>
      <div className={classes.sliderContainer}>
        <ul className={classes.list}>
          <li className={classes.listItem}> like </li>
          <li className={classes.listItem}> add to fav </li>
          <li className={classes.listItem}> telegram me </li>
          <li className={classes.listItem}> notice </li>
        </ul>
        <button className={classes.buttUnfollow}> delete </button>
      </div>
    </aside>
  );
};

export default ItemActions;
