import React, { useContext } from 'react';
import axios from 'axios'
import TodoContext from '../context';

export default function TodoList() {
  const { state, dispatch } = useContext(TodoContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing To Do!';
  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
          {console.log(state.todos)}
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className="flex bg-orange-dark  items-center border-black border-dashed border-2 my-2 py-4"
          >
            <span
              onDoubleClick={ async () =>{
                const response = await axios.patch(`https://hooks-api.nickmaslov.now.sh/todos/${todo.id}`,{
                  complete: !todo.complete
                })
                dispatch({ type: 'TOGGLE_TODO', payload: response.data })
              }}
              className={`cursor-pointer flex-1 ml-12 ${todo.complete &&
                'line-through text-grey-darkest'}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
              }
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                className="h-6"
              />
            </button>
            <button
              onClick={ async () => {
                await axios.delete(`https://hooks-api.nickmaslov.now.sh/todos/${todo.id}`)
                dispatch({ type: 'REMOVE_TODO', payload: todo })
              }}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
                className="h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
