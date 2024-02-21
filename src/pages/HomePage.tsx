import { useSelector } from "react-redux";
import MainInfo from "../ui/HomePage/MainInfo";
import MainHeader from "../ui/HomePage/MainHeader";
import { RootState } from "../store/store";

import { useEffect, useRef, useMemo } from "react";

const HomePage = () => {
  const userState = useSelector((state: RootState) => state.userState);
  const root = useRef(null);
  const target = useRef(null);

  useEffect(() => {
    const child = target.current;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const cb = function (entries: any) {
      const [entry] = entries;
      // console.log(!!entry.intersectionRatio)
      // if (!!entry.intersectionRatio) console.log(entry.intersectionRatio);
      if (entry.isIntersecting) console.log("intersecting", entry.intersectionRatio);
      else console.log("not intersec");
    };

    const observer = new IntersectionObserver(cb, options);
    if (child) observer.observe(child);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={"mainBody"}>
      <MainHeader ref={root} isToken={!!userState.token} />
      <MainInfo ref={target} />
    </div>
  );
};

export default HomePage;
