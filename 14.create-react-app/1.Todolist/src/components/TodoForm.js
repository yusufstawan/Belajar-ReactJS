import React, { useState } from "react";

const TodoForm = (props) => {
    const [inputTodo, setInputTodo] = useState("");
    const [pesanErrors, setpesanErrors] = useState(null)

    const handleInputChange = (e) => {
        setInputTodo(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputTodo.trim() === "") {
            setpesanErrors("Todo tidak boleh kosong")
        } else {
            // Input todo baru ke dalam state
            props.onAddTodo(inputTodo);
            // kosongkan input text
            setInputTodo("");
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <input type="text" placeholder="Add todo..."
                    value={inputTodo}
                    onChange={handleInputChange}
                />
                {pesanErrors && <small>{pesanErrors}</small>}
            </div>
        </form>
    )
}

export default TodoForm;
