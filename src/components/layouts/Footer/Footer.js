import React from 'react';
import classes from './Footer.module.scss';
import { theme } from '../../../themes/ThemeProvider';

function Footer(props) {
    const themeCtx = React.useContext(theme);

    return (
        <div className={`${classes.footer} ${themeCtx.isDark ? classes.dark : ''}`}>
            <div>{props.activeTodosAmount} items left</div>
            <div className={classes.filter}>
                <button
                    onClick={() => props.setActiveFilter('ALL')}
                    className={`${classes.btn} ${props.activeFilter === 'ALL' ? classes.active : ''}`}
                >
                    All
                </button>
                <button
                    onClick={() => props.setActiveFilter('ACTIVE')}
                    className={`${classes.btn} ${props.activeFilter === 'ACTIVE' ? classes.active : ''}`}
                >
                    Active
                </button>
                <button
                    onClick={() => props.setActiveFilter('COMPLETED')}
                    className={`${classes.btn} ${props.activeFilter === 'COMPLETED' ? classes.active : ''}`}
                >
                    Completed
                </button>
            </div>
            <div>
                <button className={classes.btn} onClick={props.deleteCompleted}>Clear Completed</button>
            </div>
        </div>
    );
}

export default Footer;