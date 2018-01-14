var RcSwitch = require('rcswitch');

module.exports = function (RED) {
    function RCSwitchNodeReceive(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var pin = parseInt(config.pin);
        var interval = config.interval;
        var rcswitch = new RcSwitch();
        rcswitch.enableReceive(pin);
        var tick = function () {
            if (rcswitch.available()) {
                var code = rcswitch.getReceivedValue();
                node.send({payload: code});
                rcswitch.resetAvailable();
            }
        };
        var intervalHandler;
        if (interval) {
            intervalHandler = setInterval(tick, interval);
        } else {
            this.on('input', function() {
                tick();
            });
        }
        this.on('close', function() {
            if (intervalHandler) {
                clearInterval(intervalHandler);
            }
            rcswitch.disableReceive();
        });
    }

    RED.nodes.registerType("rcswitch receive", RCSwitchNodeReceive);
};
