var querystring = require('querystring');
var twilio = require('twilio');
var config = require('config');

var client = twilio(config.twilio.accountSid, config.twilio.authToken);

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, 2));
    var message = event.Records[0].Sns.Message;
    var twiml = '<Response>'
              + '<Say voice="' + config.twilio.voice
              + '" language="' + config.twilio.language + '">'
              + message + '</Say></Response>';
    client.makeCall({
        to: config.twilio.toNumber,
        from: config.twilio.fromNumber,
        url: 'http://twimlets.com/echo?Twiml=' + querystring.escape(twiml)
    }, function (err, responseData) {
        if (err) {
          console.log(err.message);
          context.fail();
        } else {
          console.log(responseData.from);
          context.succeed();
        }
    });
};
