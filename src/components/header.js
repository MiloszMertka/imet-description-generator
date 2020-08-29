import React from "react";
import styles from "../styles/header.module.scss";

import logo from "../assets/images/svg/logo.svg";
import Button from "./button";

const Header = () => {
  return (
    <header className={styles.container}>
      <img src={logo} alt="Logo IMET" />
      <Button link={`#`}>Edytor szablonów</Button>
    </header>
  );
};

export default Header;
