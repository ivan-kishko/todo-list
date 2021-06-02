import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const errorMessage = error ? <div style={{color: "red"}}><b>title is required</b></div> : null

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickAddItem = () => {
        const validTitle = title.trim()
        if (validTitle !== '') {
            props.addItem(validTitle)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '') {
            if (e.key === 'Enter') {
                onClickAddItem()
                setTitle('')
            }
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <input className={error ? "error": ""}
                   value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}/>
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm;