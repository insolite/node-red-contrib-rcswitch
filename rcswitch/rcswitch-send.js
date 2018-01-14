var RcSwitch = require('rcswitch2');

module.exports = function (RED) {
    function RCSwitchNodeSend(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var rcswitch = new RcSwitch();
        this.on('input', function (msg) {
            var code = msg.payload || config.code;
            var pin = parseInt(msg.pin || config.pin);
            if (typeof code === 'number') {
                code = code.toString(2).padStart(24, '0'); // TODO: Configurable padding
            }
            rcswitch.enableTransmit(pin);
            rcswitch.send(code);
            rcswitch.disableTransmit();
        });
    }

    RED.nodes.registerType("rcswitch send", RCSwitchNodeSend);
};
