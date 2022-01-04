const Todo = (props) => {
    return (
        <div className="todo">{props.text}
            <span id={props.id} onClick={props.onTodoClick}>x</span>
        </div>
    )
}

export default Todo;