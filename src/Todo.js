import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel, List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';
import Checkbox from '@material-ui/core/Checkbox';

const Todo = ({ todo }) => {
    const useStyles = makeStyles(theme => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: '30px',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        listItem: {
            display: 'flex',
            padding: '30px',
            alignItems: 'center'
        },
        button: {
            margin: '5px'
        },
        textStrike: {
            textDecoration: 'line-through'
        }
    }))
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const updateStatus = (status) => {
        db.collection('todos').doc(todo.id).set({
            checked: status
        }, { merge: true });
    };

    const updateTodo = () => {
        db.collection('todos').doc(todo.id).set({
            todo: input
        }, { merge: true });
        setOpen(false);
    }

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className={classes.paper}>
                    <FormControl>
                        <InputLabel>{'UPDATE TODO'}</InputLabel>
                        <Input placeholder={todo.todo} value={input} onChange={e => setInput(e.target.value)} />
                    </FormControl>
                    <Button className={classes.button} onClick={updateTodo} variant="contained" color="secondary"><UpdateIcon />{'UPDATE'}</Button>
                    <Button onClick={() => setOpen(false)} variant="contained"><CloseIcon />{'CLOSE'}</Button>
                </div>
            </Modal>
            <List className={classes.listItem}>
                <ListItem>
                    <Checkbox checked={todo.checked} onChange={(e)=>updateStatus(e.target.checked)} color="primary" />
                    <div>
                        <ListItemText className={`${todo.checked ? classes.textStrike : ''}`} primary={todo.todo} />
                        <ListItemText secondary={`${todo.checked ? 'Completed' : 'Todo'}`} />
                    </div>
                </ListItem>
                <Button className={classes.button} disabled={todo.checked} onClick={() => setOpen(true)} variant="contained" color="secondary"><EditIcon />{'EDIT'}</Button>
                <Button onClick={() => db.collection('todos').doc(todo.id).delete()} variant="contained" color="secondary"><DeleteForeverIcon />{'DELETE'}</Button>
            </List>
        </>
    )
}

export default Todo;
