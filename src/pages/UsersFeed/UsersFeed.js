import { useEffect, useState } from "react";
import ItemsList from "../../ui/itemsList/ItemsList";
import NoItemsYet from "./NoItemsYet";
import classes from "./UsersFeed.module.css";

const FEED_URL = "http://127.0.0.1:3030/userfeed";

const UsersFeed = ({ userState }) => {
  const [_state, setState] = useState(false);

  const getRequest = () => {
    // console.log(state)
    // console.log(state.token)
    fetch(FEED_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      Authorization: `Basic ${userState.token}`,
      body: JSON.stringify({ ...userState }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(() => {
          return [...res.data] ;
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('use effect')
    if (!!userState.token) {
      getRequest();
    }
  }, [userState.token]);

  return (
    <section className={classes.feedSection}>
      <div className={classes.feedBlock}>
        <ul className={classes.feedList}>
          {_state ? <ItemsList items={_state} /> : <NoItemsYet />}
          </ul>
      </div>
    </section>
  );
};

export default UsersFeed;
