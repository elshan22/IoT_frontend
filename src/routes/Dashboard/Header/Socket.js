import React from 'react';
import {connect} from 'react-redux';
import WebSocketInstance from '../../../websocket';
import {
    receiveDataNodeTem,
    receiveNotification,
    receivePiechart, receiveColor, receiveNodeTemp,
    receiveRoomTemp, receiveMaxTemp, receiveMinTemp, receiveShortDetail
} from '../../../Actions/recieveData.js'
import {receiveDataConfig} from '../../../Actions/recieveData.js'
import store from "../../../store";
import {loadUser} from "../../../Actions/auth";
import {returnErrors} from "../../../Actions/messages";

// import Hoc from '../hoc/hoc';


class Socket extends React.Component {
    componentDidMount() {
        WebSocketInstance.connect("test");
    }

    constructor(props) {
        super(props);
        this.state = {message: '', messages: []}

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this),
                this.setNodeState.bind(this),this.setGraphConfig.bind(this),this.notMessage.bind(this),this.setError.bind(this),
                this.setPieChart.bind(this),this.setRoomTemp.bind(this),this.setNodeTemp.bind(this),this.setNodeColors.bind(this),
                this.setNodeMaxTemp.bind(this),this.setNodeMinTemp.bind(this),this.setShortDetail.bind(this))
            WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made");
                    callback();
                    return;
                } else {
                    console.log("wait for connection...");
                    component.waitForSocketConnection(callback);
                }
            }, 100);
    }

    addMessage(message) {
        this.setState({messages: [...this.state.messages, message]});
    }

    setMessages(messages) {
        this.setState({messages: messages.reverse()});
    }

    setNodeState(conf) {
        store.dispatch(receiveDataNodeTem(conf));
    }

    setError(err) {
        err = JSON.parse(err);
        store.dispatch(returnErrors(err['message'], err['color'],err['node']));
    }

    setGraphConfig(conf) {
        store.dispatch(receiveDataConfig(conf));
    }

    notMessage(conf) {
        store.dispatch(receiveNotification(conf));
    }

    setPieChart(data){
        store.dispatch(receivePiechart(data))
    }

    setRoomTemp(data){
        store.dispatch(receiveRoomTemp(data))
    }

    setNodeTemp(data){
        console.log("In dispatch Node Temp")
        console.log(data)
        store.dispatch(receiveNodeTemp(data))
    }

    setNodeColors(data){
        store.dispatch(receiveColor(data))
    }
    setNodeMaxTemp(data){
        console.log("set max temp")
        console.log(data)
        store.dispatch(receiveMaxTemp(data))
    }
    setNodeMinTemp(data){
        console.log("set min temp")
        console.log(data)
        store.dispatch(receiveMinTemp(data))
    }

    setShortDetail(data){
        console.log("short detail before dispatcher")
        console.log(data)
        store.dispatch(receiveShortDetail(data))
    }

    messageChangeHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (e) => {
        e.preventDefault();
        const messageObject = {
            from: "admin",
            content: this.state.message,
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            message: ''
        });
    }

    render() {
        return null;
    };
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Socket);