import { SOCKET_URL } from "./settings";

class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(chatUrl) {
        const path = `${SOCKET_URL}/ws/chat/${chatUrl}/`;

        console.log(path)

        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log("WebSocket open");
        };
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
        };
        this.socketRef.onclose = () => {
            console.log("WebSocket closed let's reopen");
            this.connect(chatUrl);
        };
    }

    disconnect() {
        this.socketRef.close();
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.type;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "fetch_messages") {
            this.callbacks[command](parsedData.messages);
        }
        if (command === "chat_message") {
            this.callbacks[command](parsedData.message);
        }
        if (command === "node_state") {
            this.callbacks[command](parsedData.message);
        }
        if (command === "graph") {
            this.callbacks[command](parsedData.message);
        }
        if (command === "error") {
            this.callbacks[command](parsedData.message);
        }
        if ( command === "pychart"){
            this.callbacks[command](parsedData.message);
        }
        if (command === "roomTem"){
            this.callbacks[command](parsedData.message)
        }
        if (command === "nodeTem"){
            console.log("node temp")
            this.callbacks[command](parsedData.message)
        }
        if(command === "nodeColor"){
            this.callbacks[command](parsedData.message)
        }
        if(command === "maxTemp"){
            this.callbacks[command](parsedData.message)
        }
        if(command === "minTemp"){
            this.callbacks[command](parsedData.message)
        }
        if(command === "nodeNewTem"){
            this.callbacks[command](parsedData.message)
        }

    }

    fetchMessages(username, chatId) {
        this.sendMessage({
            command: "fetch_messages",
            // username: username,
            // chatId: chatId
        });
    }

    newChatMessage(message) {
        this.sendMessage({
            command: "new_message",
            from: message.from,
            message: message.content,
        });
    }

    addCallbacks(messagesCallback, newMessageCallback,setNodeState,setGraphConfig,notMessage,setError,setPieChart,setRoomTemp,
                 setNodeTemp,setNodeColors,setNodeMaxTemp,setNodeMinTemp,setShortDetail) {
        this.callbacks["new_message"] = messagesCallback;
        this.callbacks["chat_message"] = newMessageCallback;
        this.callbacks["node_state"] = setNodeState;
        this.callbacks["graph"] = setGraphConfig;
        this.callbacks["not_message"] = notMessage;
        this.callbacks["error"] = setError;
        this.callbacks['pychart'] = setPieChart;
        this.callbacks['roomTem'] = setRoomTemp;
        this.callbacks['nodeTem'] = setNodeTemp;
        this.callbacks['nodeColor'] = setNodeColors;
        this.callbacks['maxTemp'] = setNodeMaxTemp;
        this.callbacks['minTemp'] = setNodeMinTemp;
        this.callbacks['nodeNewTem'] = setShortDetail;
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        } catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
    }

    getSocket(){
        return this.socketRef
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;