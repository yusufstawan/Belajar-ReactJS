import React, { useState } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

const todos = [
    {
        id: "01",
        text: "Baca buku React"
    },
    {
        id: "02",
        text: "Makan Siang"
    },
    {
        id: "03",
        text: "Main Game"
    }
];

const App = () => {
    const [arrayTodo, setArrayTodo] = useState(todos);

    const handleDeleteClick = (e) => {
        const newTodos = arrayTodo.filter(
            item => item.id !== e.target.id
        );
        setArrayTodo(newTodos)
    }

    const handleaddTodo = (text) => {
        const newTodos = [
            ...arrayTodo,
            {
                id: new Date().getTime().toString(),
                text: text
            }
        ];
        setArrayTodo(newTodos)
    }

    return (
        <div className='container'>
            {
                arrayTodo.map((todo) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        onTodoClick={handleDeleteClick}
                    />
                ))
            }
            <TodoForm onAddTodo={handleaddTodo} />
        </div>
    )
}

export default App;
