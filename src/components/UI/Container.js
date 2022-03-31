import React from 'react';
import styles from './Container.module.scss';
import { theme } from '../../themes/ThemeProvider';

function Container(props) {
    const themeCtx = React.useContext(theme);
    return (
        <div className={`${styles.container} ${themeCtx.isDark ? styles.dark : ''}`}>
            {props.children}
        </div>
    );
}

export default Container;