import React from "react";
import styles from "../styles/header.module.scss";
import { Link } from "react-router-dom";

import logo from "../assets/images/svg/logo.svg";

import Button from "./button";

const Header = () => {
  return (
    <header className={styles.container}>
      <Link className={styles.brand} to="/">
        <img src={logo} alt="Logo IMET" className={styles.logo} />
        <h1 className={styles.heading}>Generator opisu</h1>
      </Link>
      <Button link={`/login`}>Edytor szablonów</Button>
    </header>
  );
};

export default Header;
