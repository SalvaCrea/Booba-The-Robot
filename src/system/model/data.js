module.exports = function () {
    return {
        network: {
            lan: {
                ipAddress: ''
            },
            wifi: {
                ipAddress: ''
            }
        },
        httpServer: {
            port: 0
        },
        memory: {
            total: 0,
            noUsed: 0
        },
        cpu: {
            usage: 0,
            free: 0
        }
    }
}
