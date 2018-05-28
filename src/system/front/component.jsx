import React from "react";
import store from "basic-store-js";
import model from "../model/data";

class systemController extends React.Component {
    constructor(props) {
        super(props);
        var self = this;

        this.state  = {
            data : model()
        }
        store.get('socket').on('system-req', function (data) {
            self.setData(data);
        });
        this.action = setInterval(function () {
            self.reqData();
        }, 1000);
    }
    cleanCpuData(cpuData) {
        return Math.round(cpuData * 100) + "%"
    }
    cleanMemory(memory) {
        if (memory>0) memory = Math.round(memory / 1000000);
        memory = memory + " MO";
        return memory;
    }
    getModel() {
        return {
            network: {
                lan: {
                    ipAddress: null
                },
                wifi: {
                    ipAddress: null
                }
            },
            httpServer: {
                port: null
            },
            memory: {
                total: null,
                noUsed: null
            },
            cpu: {
                usage: null,
                free: null
            }
        }
    }
    setData (data) {
        this.setState(prevState => ({
          data: data
        }));
    }
    reqData() {
        store.get('socket').emit('system-req');
    }
    render() {
        return [
            <div className="wrapper-system-controller row" key="parent">
                <div className="col-12">
                    <h6>System Controller</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Lan Address
                                </td>
                                <td>
                                    {this.state.data.network.lan.ipAddress}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Wifi Address
                                </td>
                                <td>
                                    {this.state.data.network.wifi.ipAddress}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Http Port
                                </td>
                                <td>
                                    {this.state.data.httpServer.port}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Memory Total
                                </td>
                                <td>
                                    {this.cleanMemory(this.state.data.memory.total)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Memory Free
                                </td>
                                <td>
                                    {this.cleanMemory(this.state.data.memory.noUsed)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Cpu usage
                                </td>
                                <td>
                                    {this.cleanCpuData(this.state.data.cpu.usage)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Cpu free
                                </td>
                                <td>
                                    {this.cleanCpuData(this.state.data.cpu.free)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        ];
    }
}

export default systemController;