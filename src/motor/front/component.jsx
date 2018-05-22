import React from "react";
import ds from "../../data-service";

class MotorController extends React.Component {
    start() {
        ds.get('socket').emit('start motor', true);
    }
    stop() {
        ds.get('socket').emit('stop motor', false);
    }
    render() {
        return [
            <div className="wrapper-motor-controller" key="parent">
                <h6>Motor Controller</h6>
                <button onClick={this.start} key="left" className="btn btn-success mr-1">Start</button>
                <button onClick={this.stop} key="right" className="btn btn-warning">Stop</button>
            </div>
        ];
    }
}

export default MotorController;