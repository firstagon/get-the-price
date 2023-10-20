import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { showNotice } from "../../store/notice-actions";
import ItemsList from "../../ui/itemsList/ItemsList";
import { FEED_URL } from '../../links';
import NotFound from '../NotFound';


const UsersFeed = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);

  const [_state, setState] = useState(false);

  const sortByFav = (res) => {
    let data;
    if (!!res.data) {
      data = res.data.map(el => {
        if (!el.favorite) {
          return el = { ...el, favorite: false }
        } else {
          return el;
        }
      });
    } else {
      data = res.map(el => {
        if (!el.favorite) {
          return el = { ...el, favorite: false }
        } else {
          return el;
        }
      });
    }
    const sorted = data.sort((a, b) =>
      Number(b.favorite) - Number(a.favorite));

    return sorted;
  }


  // console.log(_state)
  const getRequest = async () => {

    fetch(FEED_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'Authorization': `${userState.token}`
      },
      body: JSON.stringify({ ...userState }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const sorted = sortByFav(res);

        setState(() => {
          return sorted;
        });
      })
      .catch((err) => dispatch(showNotice('error')));
  };

  useEffect(() => {
    if (!!userState.token) {
      getRequest();
    }

    if (!userState.token) {
      setState('')
    }

  }, [userState.token]);

  return (
    <section className={'feedSection'}>
      <div className={'feedBlock'}>
        <ul className={'feedList'}>
          {!userState.userId && <NotFound type='needUser' />}
          {_state && <ItemsList items={_state} sortByFav={sortByFav} />}
          {/* <ItemsList items={_state} />  */}
        </ul>
      </div>
    </section>
  );
};


export default UsersFeed;
