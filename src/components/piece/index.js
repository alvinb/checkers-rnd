import React from "react";
import { css } from "aphrodite/no-important";
import { style } from "./style";

const Piece = ({ posX, posY, value }) => {
  const styles = style(posX, posY);
  console.log(`(${posX}, ${posY})`);

  return (
    <div className={`${css(styles["player" + value])}`}/>
  );
};

export default Piece;
