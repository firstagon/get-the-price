import classes from "./ItemsChoice.module.css";

const ItemsChoice = () => {
  return (
    <section className={classes.mainContainer}>
      <div className={classes.itemsPreferences}>
        <button className={classes.showButton}>
          <p className={classes.textMore}> Show all</p>
          <svg className={classes.iconMore} viewBox="0 0 20 20">
            <path
              fill="black"
              stroke="black"
              d="M14.989,9.491L6.071,0.537C5.78,0.246,5.308,0.244,5.017,0.535c-0.294,0.29-0.294,0.763-0.003,1.054l8.394,8.428L5.014,18.41c-0.291,0.291-0.291,0.763,0,1.054c0.146,0.146,0.335,0.218,0.527,0.218c0.19,0,0.382-0.073,0.527-0.218l8.918-8.919C15.277,10.254,15.277,9.784,14.989,9.491z"
            ></path>
          </svg>
        </button>
      </div>
      <div className={classes.itemsContainer}>

      </div>
    </section>
  );
};

export default ItemsChoice;
