import classes from './Button.module.scss';
import React from 'react';
import sun from '../../assests/images/icon-sun.svg';
import moon from '../../assests/images/icon-moon.svg';
import { theme } from '../../themes/ThemeProvider';

function Button() {
    const themeCtx = React.useContext(theme);
    return (
        <button className={classes.btn} onClick={themeCtx.toggleTheme} >
            <img src={themeCtx.isDark ? moon : sun} alt="toggle-theme" />
        </button>
    );
}

export default Button;