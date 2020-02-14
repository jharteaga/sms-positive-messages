const cron = require('node-cron');

const config = require('./config');

const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);

const messages = require('./messages');

let currentMessage = 0;

function sendMessage(){
    client.messages
    .create({
        body: messages[currentMessage],
        from: config.trialNumber,
        to: config.phoneNumber
    })
    .then(message => {
        currentMessage++;
        console.log(message)
    });
}

cron.schedule('0 * * * *', () => {
    sendMessage();
    console.log('Message sent.');
});

