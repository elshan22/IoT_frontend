let DEBUG = true;
let HOST_URL = "https://test.herokuapp.com";
let SOCKET_URL = "wss://test.herokuapp.com";
if (DEBUG) {
    //
    // HOST_URL = "http://127.0.0.1:8000";
    // SOCKET_URL = "ws://127.0.0.1:8000";
    // HOST_URL = "http://37.156.25.234:8000";
    // SOCKET_URL = "ws://37.156.25.234:8000";
    HOST_URL = "http://91.98.15.243:8000";
    SOCKET_URL = "ws://91.98.15.243:8000";
}

export { HOST_URL, SOCKET_URL };