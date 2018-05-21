import React from "react";
import ds from "../src/DataService";

class ServoMotorController extends React.Component {
    goLeft() {
        ds.get('socket').emit('turn left', 'left');
    }
    goRight() {
        ds.get('socket').emit('turn right', 'right');
    }
    render() {
        return [
            <div className="wrapper-servo-motor-controller" key="parent">
                <h6>Servo Motor Controller</h6>
                <button onClick={this.goLeft} key="start" className="btn btn-success mr-1">Left</button>
                <button onClick={this.goRight} key="stop" className="btn btn-success">Right</button>
            </div>
        ];
    }
}

export default ServoMotorController;