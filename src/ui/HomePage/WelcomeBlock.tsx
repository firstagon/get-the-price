import React from "react";
// import classes from "./WelcomeBlock.module.css";

const WelcomeBlcok = () => {
  return (
    <section className={'welcomeSection'}>
      <div className={'welcomeBlock'}>
        <div className={'welcomeInfo'}>
          <h1 className={'header_main'}>Somthing intresting </h1>
          <p className={'paragraph_main'}>
            {" "}
            Happy to see you! <br />
            Actually i can write some more text because i want to fill all
            height{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBlcok;
