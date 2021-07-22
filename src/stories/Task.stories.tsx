import React from 'react';
// @ts-ignore
import {ComponentMeta, ComponentStory} from "@storybook/react";
// @ts-ignore
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "../Task";

export default {
    title: 'TodoList/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        removeTask: action('removeTask'),
        changeTaskTitle: action('changeTaskTitle'),
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args: TaskPropsType) => <Task {...args}/>;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    id: '1',
    isDone: true,
    title: 'JS',
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    id: '1',
    isDone: false,
    title: 'React',
};

