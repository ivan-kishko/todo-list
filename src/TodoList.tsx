import React, {useCallback} from 'react';
import {FilteredValuesType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";

export type TodoListPropsType = {
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

const TodoList = React.memo(function TodoListComponent(props: TodoListPropsType) {

    const {
        todoListID,
        title,
        tasks,
        filter,
        changeTodoListFilter,
        removeTask,
        addTask,
        changeTaskStatus,
        removeTodoList,
        changeTaskTitle,
        changeTodoListTitle
    } = props;

    console.log('todolist')
    //tasks filtering here so we can optimize rerender
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    const changeTaskStatusCallback = useCallback((id: string, isDone: boolean) => changeTaskStatus(id, isDone, todoListID), [changeTaskStatus, todoListID])
    const removeTaskCallback = useCallback((id: string) => removeTask(id, todoListID), [removeTask, todoListID])
    const changeTaskTitleCallback = useCallback((id: string, title: string) => changeTaskTitle(id, title, todoListID), [changeTaskTitle, todoListID])

    //Filters
    const onClickSetAllFilter = useCallback(() => {
        changeTodoListFilter("all", todoListID)
    }, [changeTodoListFilter, todoListID])
    const onClickSetActiveFilter = useCallback(() => {
        changeTodoListFilter("active", todoListID)
    }, [changeTodoListFilter, todoListID])
    const onClickSetCompletedFilter = useCallback(() => {
        changeTodoListFilter("completed", todoListID)
    }, [changeTodoListFilter, todoListID])

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, todoListID)
    }, [addTask, todoListID])

    const removeTodoListCallback = useCallback(() => {
        removeTodoList(todoListID)
    }, [removeTodoList, todoListID])
    const changeTodoListTitleCallback = useCallback((title: string) => {
        changeTodoListTitle(title, todoListID)
    }, [changeTodoListTitle, todoListID])

    const tasksJSXElements = tasksForTodoList.map(task => {
        return (
            <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                changeTaskStatus={changeTaskStatusCallback}
                removeTask={removeTaskCallback}
                changeTaskTitle={changeTaskTitleCallback}
            />
        )});

    return (
        <div className="TodoList">
            <div>
                <h3>
                    <EditableSpan title={title} changeTitle={changeTodoListTitleCallback}/>
                    <IconButton onClick={removeTodoListCallback} size={"small"} style={{color: 'black'}}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskCallback}/>
                <ul style={{listStyle: 'none', paddingLeft: '0', alignContent: 'flex-start'}}>
                    {tasksJSXElements}
                </ul>
                <div>
                    <Button
                        style={{marginLeft: '1px', marginRight: '1px'}}
                        size={"small"}
                        variant={filter === "all" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickSetAllFilter}>All
                    </Button>
                    <Button
                        style={{marginLeft: '1px', marginRight: '1px'}}
                        size={"small"}
                        variant={filter === "active" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickSetActiveFilter}>Active
                    </Button>
                    <Button
                        style={{marginLeft: '1px', marginRight: '1px'}}
                        size={"small"}
                        variant={filter === "completed" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={onClickSetCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
})

export default TodoList;