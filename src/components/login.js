import React, { useState } from "react";
import styles from "../styles/login.module.scss";

import Section from "./section";
import Input from "./input";
import Button from "./button";

const Login = () => {
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleLoginButtonClick = (event) => {
    event.preventDefault();
  };

  return (
    <Section className={styles.container} title={`Logowanie`}>
      <form action="" method="post">
        <Input
          id={`login`}
          value={credentials.login}
          handleChange={handleChange}
          placeholder={`Login`}
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

export default Login;
