import React from 'react';
import ReactDom from 'react-dom';

import {Provider} from "react-redux";
import {createStore,applyMiddleware} from 'redux';
import { Link } from "react-router-dom";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signin from './routes/Signin.js'
import Register from './routes/Register.js'
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
// const routing = (
//     <Router>
//         <React.StrictMode>
//             {/*<Header />*/}
//             <Routes>
//                 <Route exact path="/" component={App} />
//                 <Route path="/register" component={Register} />
//                 {/*<Route path="/login" component={Login} />*/}
//                 <Route path="/signin" component={Signin} />
//             </Routes>
//             {/*<Footer />*/}
//         </React.StrictMode>
//     </Router>
// );

ReactDom.render(
    <App />,
    document.getElementById('root')
);
