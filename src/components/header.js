import React from "react";
import styles from "../styles/header.module.scss";

import logo from "../assets/images/svg/logo.svg";

import Button from "./button";

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.brand}>
        <img src={logo} alt="Logo IMET" className={styles.logo} />
        <h1 className={styles.heading}>Generator opisu</h1>
      </div>
      <Button link={`/login`}>Edytor szablonów</Button>
    </header>
  );
};

export default Header;
