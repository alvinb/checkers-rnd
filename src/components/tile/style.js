import { StyleSheet } from "aphrodite/no-important";
import { colors } from "../../util/styles";


function tileBackground(styles){
    if(styles.isPrimaryColor) return colors.primary;

    return colors.secondary;
}

export const style = styles =>
  StyleSheet.create({
    tile: {
      backgroundColor: tileBackground(styles),
      width: '80px',
      height: '80px',
      display: 'inline-block',
      float: 'left',
      position: 'relative'
    }
  });
