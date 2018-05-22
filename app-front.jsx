import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import SocketClient from 'socket.io-client';
import DataService from "./src/data-service";


import ServoMotorController from "./src/servo-motor/front/ServoMotorController.jsx";
import SensorController from "./src/sensor/front/SensorController.jsx";
import Motor from './src/motor/front/component.jsx';
import CameraController from './src/camera/front/component.jsx';
import Menu from "./src/menu/front/Menu.jsx";

DataService.set('socket', SocketClient('http://192.168.1.15:3000'));

const App = () => (
    <div className="App container-fluid">
        <Menu />
        <h1 className="App-Title">Raspberry Interface Control</h1>
        <ServoMotorController />
        <Motor />
        <CameraController />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

