import React from "react";
import $ from "jquery";
import ds from "/web/scripts/src/DataService.js";

class CameraController extends React.Component {
    construct() {
        var self = this;
        this.srcStreaming = '';
        ds.get('socket').on('liveStream', function(url) {
            self.srcStreaming = url;
            console.log(url);
            $('.start').hide();
        });
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
                    <img src={this.srcStreaming} key="screen" id="stream"></img>
                </div>
            </div>
        ];
    }
}

export default CameraController;