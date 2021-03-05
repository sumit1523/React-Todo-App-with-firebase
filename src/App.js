import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

const App = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
			setTodos(snapshot.docs.map(doc => ({
				id: doc.id,
				todo: doc.data().todo
			})));
		})
	}, []);

	const addTodo = (e) => {
		e.preventDefault();
		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		// setTodos([...todos, input]);
		setInput('');
	}
	return (
		<div className="App">
			<h1>TODO APP</h1>
			<form>
				<FormControl>
					<InputLabel>{'Write Todo'}</InputLabel>
					<Input placeholder={'Add Todo'} value={input} onChange={e => setInput(e.target.value)} />
				</FormControl>
				<Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">Add ToDo</Button>
			</form>
			<ul>
				{todos.length > 0 ?
					todos.map(todo => (
						<Todo todo={todo} />
					))
					:
					<div>{'There is no Todo List. Please add Todos'}</div>
				}
			</ul>
		</div>
	);
}

export default App;
