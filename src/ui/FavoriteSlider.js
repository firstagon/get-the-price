import classes from "./FavoriteSlider.module.css";

const FavoriteSlider = (props) => {
  return (
    <container className={classes.container}>
      <div className={classes.sliderContainer}>
        <ul className={classes.list}>
          <li key='1' className={classes.listItem}> 1 item dasf dsf dssdf </li>
          <li key='2' className={classes.listItem}> 2 item </li>
        </ul>
      </div>
    </container>
  );
};

export default FavoriteSlider;
