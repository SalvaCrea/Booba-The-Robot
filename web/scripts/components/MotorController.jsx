import React from "react";
import ds from "../src/dataService";

class MotorController extends React.Component {
    goLeft() {
        ds.get('socket').emit('turn left', 'left');
    }
    goRight() {
        ds.get('socket').emit('turn right', 'right');
    }
    render() {
        return [
            <div key="parent">
                <button onClick={this.goLeft} key="left" className="btn btn-success">Left</button>
                <button onClick={this.goRight} key="right" className="btn btn-success">Right</button>
            </div>
        ];
    }
}

export default MotorController;