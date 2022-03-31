import React from 'react';
import classes from './Box.module.scss';
import { theme } from '../../themes/ThemeProvider';

function Box(props) {
    const themeCtx = React.useContext(theme);
    return (
        <div className={`${classes.box} ${themeCtx.isDark ? classes.dark : ''}`}>
            {props.children}
        </div>
    );
}

export default Box;