import {FilteredValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilteredValuesType
    todoListID: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}
export type TodoListsReducerActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

//reducer for all actions on TodoList
export const todoListsReducer = (todoLists: TodoListType[], action: TodoListsReducerActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID);
        case "ADD-TODOLIST":
            const newTodoListId = v1();
            const newTodoList: TodoListType = {id: newTodoListId, title: action.title, filter: "all"};
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID: todoListID
    }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
}

export const changeTodoListFilterAC = (filter: FilteredValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListID
    }
}

export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListID
    }
}
