import { useEffect, useState } from "react";
import ItemsList from "../../ui/itemsList/ItemsList";
import NoItemsYet from "./NoItemsYet";
import LoadSpinner from '../../ui/LoadSpinner/Spinner';

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
    // console.log('use effect')
    if (!!userState.token) {
      getRequest();
    }
  }, [userState.token]);

  return (
    <section className={'feedSection'}>
      <div className={'feedBlock'}>
        <ul className={'feedList'}>
          {/* {_state ? <ItemsList items={_state} /> : <LoadSpinner />} */}
          <ItemsList items={_state} /> 
          </ul>
      </div>
    </section>
  );
};

export default UsersFeed;
