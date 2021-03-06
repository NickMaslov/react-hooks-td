import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
/** heact-hooks-intro */
// import App from './AppClass';
// import App from './AppFunction';
// import App from './Login'
// import App from './Register';

/** hooks-news */
// import App from './AppNews';

/** hooks-reducer-counter */
// import App from './AppCounterReducer';
// export const UserContext = React.createContext()
// const username = "Dave";
//ReactDOM.render(<UserContext.Provider value={username}><App /></UserContext.Provider>, document.getElementById('root'));

/** hooks-todos */

import './AppNews.css';
import TodosContext from './context';
import todosReducer from './reducer';
import { useContext, useReducer, useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const savedTodos = useAPI('https://hooks-api.nickmaslov.now.sh/todos');

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos,
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

/** for developmode styling/ hot reload */
// if (module.hot) {
//     module.hot.accept();
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
