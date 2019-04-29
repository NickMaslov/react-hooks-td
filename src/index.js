import React from 'react';
import ReactDOM from 'react-dom';
/** heact-hooks-intro */
// import App from './AppClass';
// import App from './AppFunction';
// import App from './Login'
// import App from './Register';

/** hooks-news */
// import App from './AppNews';

/** hooks-todos */
import App from './AppCounterReducer';
export const UserContext = React.createContext()
const username = "Dave";
//<App /> --> 




// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UserContext.Provider value={username}><App /></UserContext.Provider>, document.getElementById('root'));

/** for developmode styling/ hot reload */
// if (module.hot) {
//     module.hot.accept();
// }


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
