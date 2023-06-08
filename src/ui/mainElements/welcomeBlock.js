import React from "react";
import classes from "./WelcomeBlock.module.css";

const WelcomeBlcok = () => {
  return (
    <section className={classes.welcomeSection}>
      <div className={classes.welcomeBlock}>
        <div className={classes.welcomeInfo}>
          <h1 className={classes.header_main}>Somthing intresting </h1>
          <p className={classes.paragraph_main}>
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
