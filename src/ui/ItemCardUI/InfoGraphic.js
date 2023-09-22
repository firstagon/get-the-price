import React, { useEffect, useRef, memo } from "react";

// const propFromParent = [1046, 1000, 2501, 3000, 1500, 100];
// const propFromParent = [1046, 10, 2000, 3500, 15];

const chartRender = (ref, points) => {

  const c = document.getElementById("priceGraph");

  const height = ref.current.getContext("2d").canvas.clientHeight;
  const width = ref.current.getContext("2d").canvas.clientWidth;

  c.height = height;
  c.width = width;

  var ctx = c.getContext("2d");

  ctx.strokeStyle = "green";

  const renderPoints = () => {

    // Creating a middleware array
    const pointsArray = [];

    for (let i = 0; i < points.length; i++) {
      let j = i + 1;
      const currPoint = {
        currentValue: { point: points[i].price, date: points[i].updated.split(',')[0] },
        startPoint: points[i].price,
        endPoint: points[j] ? points[j].price : points[i].price,
      };
      pointsArray.push(currPoint);
    }


    //Creating a function to render middleware points
    const startX = width / pointsArray.length;
    const startY = height * 0.9;
    const scaleRatio = 0.6;

    const allPoints = points.map(el => el.price);

    const maxY = Math.max(...allPoints);

    const pointsToRender = [];

    for (let i = 0; i < pointsArray.length; i++) {
      const point = pointsArray[i].currentValue.point;
      const nextPoint = pointsArray[i + 1] ? pointsArray[i + 1].currentValue.point : point;

      if (point === nextPoint || point === false) {
        continue
      }
      pointsToRender.push(pointsArray[i]);
    }
    console.log(pointsToRender)

    ctx.beginPath();
    const scaleModificator = (value) => {
      return value > 10000 ? height / maxY * scaleRatio : height / maxY * scaleRatio;
    };

    // when its 1 price

    if (pointsToRender.length <= 2) {

      const point = pointsArray[0].currentValue.point;

      ctx.rect(
        width / 5 + startX + 10,
        startY - point * scaleModificator(point),
        startX,
        startY - (startY - point * scaleModificator(point)) - 2
      )

      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();

      // creating tip price template

      ctx.font = "12px Mukta";
      ctx.fillText(
        pointsArray[0].currentValue.point,
        width / 5 + startX + startX / 2
        - (pointsArray[0].currentValue.point.toString().length),
        startY - point * scaleModificator(point) + - 5
      );

      // creating a date at the bottom of chart

      ctx.fillText(
        pointsArray[0].currentValue.date,
        width / 5 + startX + startX / 2.3,
        height
      );

        return
    }

    for (let i = 0; i < pointsToRender.length; i++) {

      const startPoint = pointsToRender[i - 1] ? pointsToRender[i - 1].currentValue.point : pointsToRender[i].currentValue.point;
      const endPoint = pointsToRender[i].currentValue.point;

      ctx.beginPath();

      if (startPoint < endPoint) {
        ctx.strokeStyle = "red";
      } else if (startPoint > endPoint) {
        ctx.strokeStyle = "green";
      } else {
        ctx.strokeStyle = "grey";
      }


      const point = pointsToRender[i].currentValue.point;

      ctx.rect(
        width / pointsToRender.length + startX + startX * i + 10 + i * 5,
        startY - point * scaleModificator(point),
        startX,
        startY - (startY - point * scaleModificator(point)) - 2
      )

      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();

      // creating tip price template

      ctx.font = "12px Mukta";
      ctx.fillText(
        pointsToRender[i].currentValue.point,
        width / pointsToRender.length + startX + startX * i + i * 5 + startX / 2
        - (pointsToRender[i].currentValue.point.toString().length),
        startY - point * scaleModificator(point) + - 5
      );

      // creating a date at the bottom of chart

      ctx.fillText(
        pointsToRender[i].currentValue.date,
        width / pointsToRender.length + startX + startX * i + i * 5 + startX / 5,
        height
      );

    }

  };

  renderPoints();
};

const InfoGraphic = ({ array }) => {
  const ref = useRef();
  useEffect(() => {
    chartRender(ref, array);
  }, [array]);

  return (
    <section className='container'>
      <canvas className='canvas' id="priceGraph" ref={ref}></canvas>
    </section>
  );
};

export default memo(InfoGraphic);
