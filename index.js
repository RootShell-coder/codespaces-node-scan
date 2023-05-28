//run npm start
const Evilscan = require('evilscan');

const options = {
    target: 'target ip address',
    //  target:'8.8.8.8-10',
    port: 'target port',
    //  port:'22-10000',
    //  status:'TROU', // Timeout, Refused, Open, Unreachable
    status: 'O',
    banner: true
};

const evilscan = new Evilscan(options);

evilscan.on('result', data => {
    console.log(data);
});

evilscan.on('error', err => {
    throw new Error(data.toString());
});

evilscan.on('done', () => {
});

evilscan.run();
