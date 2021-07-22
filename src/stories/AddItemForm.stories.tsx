import React from 'react';
// @ts-ignore
import {ComponentMeta, ComponentStory} from "@storybook/react";
import AddItemForm, {AddItemFormPropsType} from "../AddItemForm";
// @ts-ignore
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Item added'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args: AddItemFormPropsType) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action('Item added')
};

