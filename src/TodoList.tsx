import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilteredValuesType} from "./App";

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
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                <span className={task.isDone ? "is-done" : ""}>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    });

    const [title, setTitle] = useState<string>('')

    const [error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.todoListID)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '') {
            if (e.key === 'Enter') {
                onClickAddTask()
                setTitle('')
            }
        } else {
            setError(true)
        }
    }

    const onClickSetAllFilter = () => {
        props.changeTodoListFilter("all", props.todoListID)
    }

    const onClickSetActiveFilter = () => {
        props.changeTodoListFilter("active", props.todoListID)
    }

    const onClickSetCompletedFilter = () => {
        props.changeTodoListFilter("completed", props.todoListID)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    }

    return (
        <div className="TodoList">
            <div>
                <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
                <div>
                    <input className={error ? "error": ""} value={title} onChange={onChangeTitle} onKeyPress={onKeyPressAddTask}/>
                    <button onClick={onClickAddTask}>+</button>
                    {error && <div style={{color: "red"}}><b>title incorrect</b></div>}
                </div>
                <ul>
                    {tasksJSXElements}
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickSetAllFilter}>All</button>
                    <button className={props.filter === "active" ? "active-filter" : ""} onClick={onClickSetActiveFilter}>Active</button>
                    <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onClickSetCompletedFilter}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;