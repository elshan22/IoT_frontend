import React from 'react';
import {connect} from 'react-redux';
import WebSocketInstance from '../websocket';

// import Hoc from '../hoc/hoc';


class Chat extends React.Component {
    componentDidMount() {
        WebSocketInstance.connect("test");
    }

    constructor(props) {
        super(props);
        this.state = {message: '', messages: []}

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
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
        document.querySelector('#chat-log').value = "\n"
        for (let i = 0; i < this.state.messages.length; i++) {
            document.querySelector('#chat-log').value += (this.state.messages[i] + '\n');
        }
    }

    setMessages(messages) {
        this.setState({messages: messages.reverse()});
    }

    messageChangeHandler = (event) => {
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

    renderMessages = (messages) => {
        // const currentUser = this.props.username;
        return messages.map((message) => (
            <li
                key={message.id}>
                {/*style={{marginBottom: arr.length - 1 === i ? '300px' : '15px'}}>*/}
                {/*<img src="http://emilcarlsson.se/assets/mikeross.png" />*/}
                <p>{message.content}
                    <br/>
                </p>
            </li>
        ));
    }

    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // }

    // componentDidMount() {
    //     this.scrollToBottom();
    // }
    //
    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }

    render() {
        return (
            <div>
                <form onSubmit={this.sendMessageHandler}>
                    <textarea id="chat-log" cols="100" rows="20"/>
                    <br/>
                    <input
                        onChange={this.messageChangeHandler}
                        value={this.state.message}
                        required
                        placeholder="Write your message..."
                        id="chat-message-input" type="text" size="100"/>
                    <br/>
                    <input id="chat-message-submit" type="submit" value="Send"/>
                </form>


            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Chat);