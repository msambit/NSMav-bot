
// Acquiring Configurations File
const config = require('./config.js')

var apiai = require('apiai');

var app = apiai(config.apiai);

module.exports = {
    recognize: function(context, callback) {
        var request = app.textRequest(context.message.text, {
            sessionId: Math.random()
        });

        request.on('response', function(response) {
            var result = response.result;

            callback(null, {
                intent: result.metadata.intentName,
                score: result.score
            });
        });

        request.on('error', function(error) {
            callback(error);
        });

        request.end();
    }
};