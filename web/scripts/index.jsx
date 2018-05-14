import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import SocketClient from 'socket.io-client';
import DataService from "./src/DataService";

import Menu from "./components/Menu";
import MotorController from "./components/MotorController";
import SensorController from "./components/SensorController";

DataService.set('socket', SocketClient('http://192.168.1.15:3000'));

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