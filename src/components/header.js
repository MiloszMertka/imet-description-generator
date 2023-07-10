import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/header.module.scss";
import { Link } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";
import { SECTIONS, ACTION_TYPES } from "../constants";

import logo from "../assets/images/svg/logo.svg";

import Button from "./button";
import { useToasts } from "react-toast-notifications";

const Header = ({ state, dispatch }) => {
  const { addToast } = useToasts();

  const [generating, setGenerating] = useState(false);

  const handleGenerateDescriptionButtonClick = useCallback(async () => {
    setGenerating(true);

    const productName = state[SECTIONS.NAME];
    const specification = state[SECTIONS.SPECIFICATION];

    const result = await window.api.generateDescription(productName, specification);

    if (result === null) {
      return addToast("Błąd generowania opisu", { appearance: "error" });
    }

    dispatch({ type: ACTION_TYPES.CHANGE_PROP, section: SECTIONS.DESCRIPTION, value: result });
    setGenerating(false);
    addToast("Opis został wygenerowany", { appearance: "success" });
  }, [state, dispatch, addToast]);

  return (
    <header className={styles.container}>
      <Link className={styles.brand} to="/">
        <img src={logo} alt="Logo IMET" className={styles.logo} />
        <h1 className={styles.heading}>Generator opisu</h1>
      </Link>
      <div className={styles.buttons}>
        <Button handleClick={() => handleGenerateDescriptionButtonClick()} disabled={generating} className={styles.generateButton}>
          <div className={styles.spinner}>
            <MetroSpinner size={30} color="#b72c30" loading={generating} />
          </div>
          Generuj opis
        </Button>
        <Button link={`/login`}>Edytor szablonów</Button>
      </div>
    </header>
  );
};

Header.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Header;
