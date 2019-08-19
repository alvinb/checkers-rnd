
import { StyleSheet } from "aphrodite/no-important";
import { colors } from "../../util/styles";



export const style = (styles) =>
  StyleSheet.create({
    player1:{
        display: 'block',
        position: 'absolute',
        top: styles.posY+'px',
        left: styles.posX+'px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: colors.player1,
        zIndex: "1000"
        
    },
    player2: {
        display: 'block',
        position: 'absolute',
        top: styles.posY+'px',
        left: styles.posX+'px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: colors.player2,
        zIndex: "1000"
        
    },
    hovered: {
        boxShadow: '0px 0px 5px 5px'+colors.hover
    },
    selected: {
        boxShadow: '0px 0px 5px 5px'+colors.hover
    },

    king: {
        border: '3px solid '+colors.king,
        top: styles.posY-1+'px',
        left: styles.posX-1+'px'
    },

    canMove: {
        boxShadow: '0px 0px 3px 3px'+colors.hover
    }
  });
