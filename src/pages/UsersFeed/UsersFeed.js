import { useEffect, useState } from "react";
import ItemsList from "../../ui/itemsList/ItemsList";
import NoItemsYet from "./NoItemsYet";
import LoadSpinner from '../../ui/LoadSpinner/Spinner';
import { FEED_URL } from '../../links';
import NotFound from '../NotFound';


const UsersFeed = ({ userState, showStatus }) => {
  const [_state, setState] = useState(false);

  // console.log(_state)
  const getRequest = async () => {

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
        let data = res.data.map(el => {
          if (!el.favorite) {
            return el = {...el, favorite: false}
          } else {
            return el;
          }
        });

        const sorted = data.sort((a, b) => 
           Number(b.favorite) - Number(a.favorite));

           console.log('working hard')
        setState(() => {
          return sorted;
        });

      })
      .catch((err) => showStatus.status('error'));
  };

  useEffect(() => {
    if (!!userState.token) {
      getRequest();
    }

  }, [userState.token]);

  return (
    <section className={'feedSection'}>
      <div className={'feedBlock'}>
        <ul className={'feedList'}>
          {!userState.userId && <NotFound type='needUser' />}
          {_state && <ItemsList items={_state} getRequest={getRequest} />}
          {/* <ItemsList items={_state} />  */}
        </ul>
      </div>
    </section>
  );
};

export default UsersFeed;
