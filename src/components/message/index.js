import React from 'react';
import { css } from 'aphrodite/no-important';
import { style } from './style';




const Message = ({ text }) => {
    
    const styles = style();

    return (
        <p className={`${css(styles.message)}`}>
            {text}
        </p>
    
  );
};

export default Message;
