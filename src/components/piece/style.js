
import { StyleSheet } from "aphrodite/no-important";
import { colors } from "../../util/styles";



export const style = (x, y) =>
  StyleSheet.create({
    player1:{
        display: 'block',
        position: 'absolute',
        top: y+'px',
        left: x+'px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: colors.player1,
        zIndex: "1000"
        
    },
    player2: {
        display: 'block',
        position: 'absolute',
        top: y+'px',
        left: x+'px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: colors.player2,
        zIndex: "1000"
        
    }
  });
