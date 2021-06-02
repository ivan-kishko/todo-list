import React, {ChangeEvent} from 'react';
import {FilteredValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilteredValuesType
    changeTodoListFilter: (filterValue: FilteredValuesType, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: PropsTodoListType) {
    const tasksJSXElements = props.tasks.map(task => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListID)
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                {/*<span>{task.title} </span>*/}
                <button onClick={removeTask}> x</button>
            </li>
        )
    });

    const onClickSetAllFilter = () => {
        props.changeTodoListFilter("all", props.todoListID)
    }
    const onClickSetActiveFilter = () => {
        props.changeTodoListFilter("active", props.todoListID)
    }
    const onClickSetCompletedFilter = () => {
        props.changeTodoListFilter("completed", props.todoListID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return (
        <div className="TodoList">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <button onClick={removeTodoList}>X</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {tasksJSXElements}
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""}
                            onClick={onClickSetAllFilter}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={onClickSetActiveFilter}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={onClickSetCompletedFilter}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;