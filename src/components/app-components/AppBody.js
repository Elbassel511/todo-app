import React from 'react';
import InputForm from './InputForm';
import TodoList from './TodoList';
import { nanoid } from 'nanoid';
import Box from '../UI/Box';
import Footer from '../layouts/Footer/Footer';
import Modal from '../UI/Modal';

const DUMMY_TODOS = [
    {
        id: 't1',
        body: 'Complete online java script course ',
        isComplete: true
    },
    {
        id: 't2',
        body: 'Jog around the park 3x',
        isComplete: false
    },
    {
        id: 't3',
        body: '10 minutes meditation',
        isComplete: false
    },
    {
        id: 't4',
        body: 'Read for 1 hour',
        isComplete: false
    },
    {
        id: 't5',
        body: 'Pick up groceries',
        isComplete: false
    },
    {
        id: 't6',
        body: 'Complete Todo App on Frontend Mentor',
        isComplete: false
    }
];

function todosReducer(todos, action) {
    switch (action.type) {
        case 'LOCAL__STORAGE_TODOS':
            return (action.savedTodos);

        case 'NEW_TODO':
            const newTodo = {
                id: nanoid(),
                body: action.todoBody,
                isComplete: false
            };
            return [newTodo, ...todos];

        case 'ARRAGE_LIST':
            return (action.updatedItems);

        // case 'isComplete'
        case 'TODO_COMPLETED':
            return (
                todos.map(todo => todo.id !== action.id ? todo : { ...todo, isComplete: !todo.isComplete })
            );

        // case 'delete':
        case 'DELETE_TODO':
            return (todos.filter(todo => todo.id !== action.id));

        // Clear Completed:
        case 'DELETE_COMPLETED':
            return (todos.filter(todo => todo.isComplete === false));


        default:
            return (todos);

    }


}



function AppBody() {
    // Getting todo Data from local Storage  if exist ,if not set them to DUMMY TODO 
    const savedTodos = localStorage.getItem('Todos') ?
        JSON.parse(localStorage.getItem('Todos')) : DUMMY_TODOS;
    const [todos, dispatch] = React.useReducer(todosReducer, savedTodos);
    const [error, setError] = React.useState('');
    // filters (ALL , ACTIVE , COMPLETED)
    const [activeFilter, setActiveFilter] = React.useState('ALL');
    // const [filteredTodos, setFilteredTodos] = React.useState(todos);
    const [activeTodosAmount, setActiveTodosAmount] = React.useState();

    // function to set data in local storage
    React.useEffect(
        () => {
            localStorage.setItem('Todos', JSON.stringify(todos));
        }, [todos]);


    // new TODO
    function getNewdata(newTodo) {
        if (newTodo.trim().length === 0 || newTodo.trim().length > 30) {
            const error = 'Please Enter a valid Todo length (1-30)';
            setError(error);
            return;
        }
        dispatch({ type: 'NEW_TODO', todoBody: newTodo });
    }

    // filter data
    // React.useEffect(() => {
    //     switch (activeFilter) {
    //         case 'ACTIVE':
    //             setFilteredTodos(todos.filter(todo => todo.isComplete === false));
    //             break;
    //         case 'COMPLETED':
    //             setFilteredTodos(todos.filter(todo => todo.isComplete === true));
    //             break;
    //         default:
    //             // default is "ALL"
    //             setFilteredTodos(todos);
    //     }
    // }, [activeFilter, todos]);

    // getting active todo 
    React.useEffect(() => {
        const activeTodos = todos.filter(todo => todo.isComplete === false);
        setActiveTodosAmount(activeTodos.length);
    }, [todos]);

    // reseting Errors 
    function resetErrors() {
        setError('');
    }



    return (

        <main>
            {error.length > 0 && <Modal onClick={resetErrors}>{error}</Modal>}
            <InputForm handlingInput={getNewdata} />
            <Box>
                {todos.length > 0 &&
                    <>
                        <TodoList
                            activeFilter={activeFilter}
                            todos={todos}
                            updateTodos={updatedItems => dispatch({ type: 'ARRAGE_LIST', updatedItems })}
                            completed={id => dispatch({ type: 'TODO_COMPLETED', id })}
                            deleteTodo={id => dispatch({ type: 'DELETE_TODO', id })}
                        />

                        <Footer
                            activeTodosAmount={activeTodosAmount}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            deleteCompleted={() => dispatch({ type: 'DELETE_COMPLETED' })} />
                    </>
                }
            </Box>

        </main>

    );
}

export default AppBody;