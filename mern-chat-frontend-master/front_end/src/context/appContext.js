import { io } from "socket.io-client";
    // import io function from socket client to establish connection with server socket.

import React from "react";

const SOCKET_URL = "http://localhost:5001"; 
    // server are running on port 5001

export const socket = io(SOCKET_URL);
    // This line creates a socket object by calling the io function from the socket.io-client library and passing in the SOCKET_URL.
    // This establishes a connection to the socket.io server at the specified URL.

// app context
export const AppContext = React.createContext();
    // The AppContext is a context object that can be used to share data across components or within  React application.
    // context object means sharing data without usings props. 
