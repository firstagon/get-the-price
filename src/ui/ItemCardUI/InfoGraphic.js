import React, { useEffect, useRef, memo } from "react";
import classes from "./InfoGraphic.module.css";

// const propFromParent = [1046, 1000, 2501, 3000, 1500, 100];
// const propFromParent = [1046, 10, 2000, 3500, 15];

const chartRender = (ref, points) => {
  var c = document.getElementById("priceGraph");

  // console.log(ref.current.getContext("2d").canvas.clientWidth);
  const height = ref.current.getContext("2d").canvas.clientHeight;
  const width = ref.current.getContext("2d").canvas.clientWidth;

  c.height = height;
  c.width = width;

  // console.log(width/100 * 10);
  var ctx = c.getContext("2d");

  ctx.strokeStyle = "green";

  const renderPoints = () => {
    // Creating a middleware array
    const pointsArray = [];


      for (let i = 0; i < points.length; i++) {
        // console.log(i);
        // console.log(points[i])
        let j = i + 1;
        // console.log(j);
        const currPoint = {
          currentValue: points[i],
          startPoint: points[i],
          endPoint: points[j] ? points[j] : points[i],
        };
        // console.log(currPoint);
        pointsArray.push(currPoint);
      }
    

    //Creating a function to render middleware points
    const startX = width / pointsArray.length;
    const startY = height * 0.9;

    const maxY = Math.max(...points);

    for (let i = 0; i < pointsArray.length; i++) {
      const startPoint = pointsArray[i].startPoint;
      const endPoint = pointsArray[i].endPoint;

      // console.log(startPoint, endPoint);

      ctx.beginPath();
      ctx.setLineDash([]);

      if (startPoint < endPoint) {
        ctx.strokeStyle = "red";
      } else if (startPoint > endPoint) {
        ctx.strokeStyle = "green";
      } else {
        ctx.strokeStyle = "black";
      }

      const scaleModificator = (value) => {
        return value > 10000 ? height/maxY * 0.8 : height/maxY * 0.8;
      };

      ctx.moveTo(
        startX * i + 10,
        startY - startPoint * scaleModificator(startPoint)
      );

      // Creationg a points with price

      const sideNumb = startPoint - endPoint < 0 ? +15 : -5;

      ctx.arc(
        startX * i + 10,
        startY - startPoint * scaleModificator(startPoint),
        3,
        0,
        6
      );
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
      ctx.font = "12px serif";
      ctx.fillText(
        pointsArray[i].currentValue,
        startX * i + 15,
        startY - startPoint * scaleModificator(startPoint) + sideNumb
      );

      if (startPoint === endPoint) {
        return;
      } else {
        ctx.lineTo(
          startX * (i + 1) + 10,
          startY - endPoint * scaleModificator(endPoint)
        );
      }
      ctx.stroke();
    }
  };

  // const renderBase = () => {
  //   ctx.beginPath();
  //   ctx.strokeStyle = "black";
  //   ctx.setLineDash([5, 10]);
  //   ctx.moveTo(width / 2, 0);
  //   ctx.lineTo(width / 2, height);
  //   ctx.stroke();
  // };

  // renderBase();
  renderPoints();
};

const InfoGraphic = ({array}) => {
  const ref = useRef();

  // console.log(array)

  const points = array.map(el => el.price)

  useEffect(() => {
    chartRender(ref, points);
  }, [points]);

  return (
    <section className={classes.container}>
      <canvas className={classes.canvas} id="priceGraph" ref={ref}></canvas>
    </section>
  );
};

export default memo(InfoGraphic);
