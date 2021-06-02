import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilteredValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilteredValuesType

}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID_1, title: 'What to learn', filter: "all"},
        {id: todoListID_2, title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Coconut", isDone: false},
            {id: v1(), title: "Pineapple", isDone: false}
        ],
    })

    function changeTodoListFilter(filter: FilteredValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }
    function addTodoList(title: string) {
        const newTodoListId = v1();
        const newTodoList: TodoListType = {id: newTodoListId, title, filter: "all"};

        setTodoLists([...todoLists, newTodoList]);
        setTasks({...tasks, [newTodoListId]: []});
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTasks)
    }
    function removeTask(taskID: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyTasks)
        // if (filteredTasks !== tasks) { примерно как работает setState
        // tasks = filteredTasks
        // React.DOM.render() }
    }
    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = copyTasks[todoListID].map(task => task.id === taskId ? {...task, isDone} : task)
        setTasks(copyTasks)
    }
    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = copyTasks[todoListID].map(task => task.id === taskId ? {...task, title} : task)
        setTasks(copyTasks)
    }

    //UI
    function getFilteredTasks(tl: TodoListType) {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => !t.isDone)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        const tasksForTodoList = getFilteredTasks(tl)
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                tasks={tasksForTodoList}
                filter={tl.filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponents}
        </div>
    );
}

export default App;
