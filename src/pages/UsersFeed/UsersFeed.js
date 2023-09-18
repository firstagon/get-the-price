import { useEffect, useState } from "react";
import ItemsList from "../../ui/itemsList/ItemsList";
import NoItemsYet from "./NoItemsYet";
import LoadSpinner from '../../ui/LoadSpinner/Spinner';
import {FEED_URL} from '../../links';
import NotFound from '../NotFound';


const UsersFeed = ({ userState, showStatus }) => {
  const [_state, setState] = useState(false);
   
  const getRequest = () => {

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
        // showStatus.status('loaded');
        setState(() => {
          return [...res.data] ;
        });
      })
      .catch((err) => showStatus.status('error'));
  };

  useEffect(() => {
    // console.log('use effect')
    if (!!userState.token) {
      // showStatus.status('loading');
      getRequest();
    }

  }, [userState.token]);

  return (
    <section className={'feedSection'}>
      <div className={'feedBlock'}>
        <ul className={'feedList'}>
          {!userState.userId && <NotFound type='needUser' />}
          {_state && <ItemsList items={_state} />}
          {/* <ItemsList items={_state} />  */}
          </ul>
      </div>
    </section>
  );
};

export default UsersFeed;
