import React, {Component, Fragment} from "react";
import './App.css'
import {BrowserRouter, HashRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./routes/Signin";
import Chat from "./Containers/Chat.js"
import HeaderComponent from "./routes/Dashboard/Header/HeaderComponent";
import Register from './routes/Register.js'
import PrivateRoute from "./Components/common/PrivateRoute";
import {Provider} from "react-redux";
import store from "./store";
import Checkout from './Components/ProfileSetting/ProfSetting.js'
import {loadUser} from "./Actions/auth";
import Navbar from "./routes/Dashboard/Header/testNavbar";
import Socket from "./routes/Dashboard/Header/Socket";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (

            <Provider store={store}>
            <Socket/>
                <HashRouter>
                    {/*<Routes>*/}
                    {/*    <Route path="/signin" element={<SignIn />} />*/}
                    {/*    <Route path="/login" element={<Login />} />*/}
                    {/*    <Route path="/" element={<HeaderComponent />} />*/}
                    {/*    <PrivateRoute path="/dashboard" element={<HeaderComponent />} />*/}
                    {/*    <Route path="/data" element={<SendData />} />*/}
                    {/*    /!*<Route path="/register">*!/*/}
                    {/*    /!*    <Register />*!/*/}
                    {/*    /!*</Route>*!/*/}
                    {/*</Routes>*/}
                    <Switch>
                        <PrivateRoute exact path="/admin" component={HeaderComponent} />
                        <Route exact path="/" render={props => {
                                return <Redirect to="/admin"/> ;
                        }} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={SignIn}/>
                        <Route exact path="/chat" component={Chat} />
                        <Route exact path="/setting" component={Checkout} />
                        <PrivateRoute exact path="/test" component={Navbar} />
                    </Switch>
                </HashRouter>

            </Provider>

        );
    }
}

export default App;