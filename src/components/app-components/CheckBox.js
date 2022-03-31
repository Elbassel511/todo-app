import React from 'react';
import classes from './CheckBox.module.scss';

function CheckBox(props) {

    return (
        <div
            className={classes.checkbox}
            aria-checked={props.isComplete}
            onClick={props.onClick}
            tabIndex="0"
            role='checkbox'
        />

    );
}

export default CheckBox;
