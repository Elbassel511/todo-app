import React from 'react';
import Box from '../UI/Box';
import CheckBox from './CheckBox';
import classes from './InputForm.module.scss';
import { theme } from '../../themes/ThemeProvider';

function InputForm(props) {
    const themeCtx = React.useContext(theme);
    const inputBody = React.useRef('');
    const [isComplete, setIsComplete] = React.useState(false);


    function newTodo(e) {
        e.preventDefault();
        props.handlingInput(inputBody.current.value);
        inputBody.current.value = '';
        setIsComplete(false);
    }


    return (
        <Box>
            <form
                onSubmit={newTodo}
                className={`${classes.form} ${themeCtx.isDark ? classes.dark : ''}`}>
                <input type="text" ref={inputBody} placeholder='Create a new todo ...' />
                <CheckBox onClick={newTodo} isComplete={isComplete} setIsComplete={setIsComplete} />
            </form>
        </Box>
    );
}

export default InputForm;