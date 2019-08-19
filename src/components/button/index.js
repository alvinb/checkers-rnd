import React from "react";
import { css } from "aphrodite/no-important";
import { style } from "./style";

const Button = ({ text, onClick }) => {
  const styles = style();

  return <button 
            className={`${css(styles.button)}`}
            onClick={onClick}
        >{text}</button>;
};

export default Button;
