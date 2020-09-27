import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/section.module.scss";

const Section = ({ children, title, className }) => {
  return (
    <section className={`${styles.container} ${className}`}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Section;
