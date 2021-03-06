import React from "react";
import store from "basic-store-js";

class ServoMotorController extends React.Component {
    goLeft() {
        console.log('left');
        store.get('socket').emit('turn-left', 'left');
    }
    goRight() {
        console.log('right');
        store.get('socket').emit('turn-right', 'right');
    }
    render() {
        return [
            <div className="wrapper-servo-motor-controller" key="parent">
                <h6>Servo Motor Controller</h6>
                <button onFocus={this.goLeft} onClick={this.goLeft} key="start" className="btn btn-success mr-1">Left</button>
                <button onMouseOver={this.goRight} onClick={this.goRight} key="stop" className="btn btn-success">Right</button>
            </div>
        ];
    }
}

export default ServoMotorController;