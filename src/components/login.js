import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import styles from "../styles/login.module.scss";
import { postDataToAPI } from "../utils";

import Section from "./section";
import Input from "./input";
import Button from "./button";

const Login = ({ authenticate, isAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleLoginButtonClick = async (event) => {
    event.preventDefault();
    const token = await postDataToAPI("/login", credentials);
    authenticate(token.access_token);
  };

  return isAuthenticated ? (
    <Redirect to={{ pathname: "/edytor-szablonow" }} />
  ) : (
    <Section className={styles.container} title={`Logowanie`}>
      <form action="" method="post">
        <Input
          id={`email`}
          value={credentials.email}
          handleChange={handleChange}
          placeholder={`E-mail`}
        />
        <Input
          id={`password`}
          value={credentials.password}
          handleChange={handleChange}
          type={`password`}
          placeholder={`Hasło`}
        />
        <Button className={styles.button} handleClick={handleLoginButtonClick}>
          Zaloguj się
        </Button>
      </form>
    </Section>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
