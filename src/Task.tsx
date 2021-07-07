import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    id: string;
    title: string;
    isDone: boolean;
    changeTaskStatus: (id: string, isDone: boolean) => void
    removeTask: (id: string) => void
    changeTaskTitle: (id: string, title: string) => void
}

const Task = React.memo(function TaskComponent({id, changeTaskTitle, ...props}: TaskPropsType) {
    console.log('task')
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(id, e.currentTarget.checked)
    const removeTask = () => props.removeTask(id)
    const changeTaskTitleCallback = useCallback((title: string) => changeTaskTitle(id, title), [changeTaskTitle, id])

    return (
        <li key={id}>
            <span className={props.isDone ? "is-done" : ""}>
                <Checkbox
                    size={"small"}
                    color={"primary"}
                    checked={props.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={props.title} changeTitle={changeTaskTitleCallback}/>
            </span>
            <IconButton onClick={removeTask} size={"small"} style={{color: 'black'}}>
                <Delete/>
            </IconButton>
        </li>
    )
})

export default Task;