import React from 'react';
import CheckBox from './CheckBox';
import classes from './TodoList.module.scss';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import arrayMove from 'array-move';
import { theme } from '../../themes/ThemeProvider';


function TodoList(props) {
    const todos = props.todos;
    // filter todos (All,Active,completed)
    const themeCtx = React.useContext(theme);



    const listItems = todos.map((todo, index) =>
    (<Draggable key={todo.id} draggableId={todo.id} index={index}>
        {(provided) => (
            <li
                id={todo.id}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
                className={classes['list--item']}
            >
                <CheckBox
                    onClick={props.completed.bind(null, todo.id)}
                    isComplete={todo.isComplete}
                />

                <p className={` ${classes['list--body']} ${todo.isComplete ? classes.completed : ' '} `}>
                    {todo.body}
                </p>

                <button
                    className={classes.btn}
                    onClick={props.deleteTodo.bind(null, todo.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
                </button>
            </li>
        )}
    </Draggable >

    )
    );

    // rearrage items on drag end
    function rearrangeItems(result) {
        // return if drop happened outside list
        if (!result.destination) return;
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const updatedItems = arrayMove(todos, sourceIndex, destinationIndex);
        // sending updated todos to app body
        props.updateTodos(updatedItems);
    }


    return (

        <DragDropContext onDragEnd={rearrangeItems}>
            <Droppable droppableId='droppable' >
                {(provided) => (<ul
                    className={`${classes.list} ${themeCtx.isDark ? classes.dark : ''}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {listItems}
                    {provided.placeholder}
                </ul>)}
            </Droppable>
        </DragDropContext>


    );
}


export default TodoList;
