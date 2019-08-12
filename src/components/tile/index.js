import React from "react";
import { css } from 'aphrodite/no-important';
import { style } from './style';


const Tile = ({indexX, indexY, isPrimaryColor, value}) => {
    const styles = style({isPrimaryColor})

  return (
    <div className={`${css(styles.tile, styles['player'+value])} player${value} ${indexX}-${indexY}`}></div>
  );
};

export default Tile;
