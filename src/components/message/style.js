import { StyleSheet } from "aphrodite/no-important";
import { colors } from "../../util/styles";

export const style = styles =>
    StyleSheet.create({
        message: {
            color: colors.dark,
            textAlign: 'left',
            margin: '10px'
        }
    });
