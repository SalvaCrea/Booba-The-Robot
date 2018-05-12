import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import SocketClient from 'socket.io-client';
import dataService from "./src/dataService";

import Menu from "./components/Menu";
import MotorController from "./components/MotorController";

const socket = SocketClient('http://192.168.1.15:3000');
socket.emit('connection', 'qsdsqd');
dataService.set('socket', socket);

function test() {
    socket.emit('connection', 'qsdsqd');
}
test();

const App = () => (
    <div className="App container-fluid">
        <Menu />
        <h1 className="App-Title">Raspberry Interface Control</h1>
        <MotorController />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}