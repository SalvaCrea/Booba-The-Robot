import React from "react";
import $ from "jquery";
import ds from "../../data-service";

class CameraController extends React.Component {
    constructor(props) {
        super(props);
        var self = this;
        this.state  = {
            srcStreaming : ''
        }
        ds.get('socket').on('liveStream', function(url) {
            self.liveStream(url)
        });
    }
    liveStream(url) {
        console.log('update');
        this.setState(prevState => ({
          srcStreaming: url
        }));
    }
    startStream() {
        ds.get('socket').emit('start-stream');
    }
    render() {
        return [
            <div className="wrapper-motor-controller" key="parent">
                <h6>Camera Controller</h6>
                <button type="button" className="btn btn-info start" key="start" onClick={this.startStream} >Start Camera</button>
                <div className="row">
                    <img src={this.state.srcStreaming} key="screen" id="stream"></img>
                </div>
            </div>
        ];
    }
}

export default CameraController;