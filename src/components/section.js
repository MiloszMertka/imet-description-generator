import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/section.module.scss";

const Section = ({ children, title }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default Section;
