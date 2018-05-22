import React from "react";
import ds from "../../data-service";

class SensorController extends React.Component {
    goLeft() {
        console.log('ordre');
        ds.get('socket').emit('turn left', 'left');
    }
    goRight() {
        console.log('ordre2');
        ds.get('socket').emit('turn right', 'right');
    }
    render() {
        return [
            <div className="wrapper-sensor-controller" key="parent">
                <h6>Sensor Controller</h6>
                <button onMouseOver={this.goLeft} onClick={this.goLeft} key="left" className="btn btn-success mr-1">Left</button>
                <button onMouseOver={this.goRight} onClick={this.goRight} key="right" className="btn btn-success">Right</button>
            </div>
        ];
    }
}

export default SensorController;