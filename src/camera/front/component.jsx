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
            self.setSrcStreaming(url)
        });
    }
    setSrcStreaming(url) {
        this.setState(prevState => ({
          srcStreaming: url
        }));
    }
    startStream() {
        ds.get('socket').emit('start-stream');
    }
    stopSteam() {
        ds.get('socket').emit('start-stream');
        this.setState(prevState => ({
          srcStreaming: ''
        }));
    }
    render() {
        return [
            <div className="wrapper-motor-controller row" key="parent">
                <div className="col-12">
                    <h6>Camera Controller</h6>
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-info start" key="start" onClick={this.startStream} >Start Camera</button>
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-info start" key="start" onClick={this.stopSteam} >Stop Camera</button>
                </div>
                <div className="col-12">
                    <img src={this.state.srcStreaming} className="img-response" key="screen" id="stream"></img>
                </div>
            </div>
        ];
    }
}

export default CameraController;