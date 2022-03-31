import React from 'react';
import classes from './Header.module.scss';
import Button from '../../button/Button';

export default function Header() {
    return (
        <header className={classes.header}>
            <h1>Todo</h1>
            <Button />
        </header>
    );
}
