import { StyleSheet } from "aphrodite/no-important";
import { colors } from "../../util/styles";

export const style = styles =>
  StyleSheet.create({
    board: {
        width: '640px',
        height: '640px',
        border: '2px solid '+colors.medium ,
        position: 'relative'
    }
  });
