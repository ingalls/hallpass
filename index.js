'use strict';

const pkg = require('./package.json');
const request = require('request');
const cron = require('node-cron');
const Notify = require('./lib/notify');
const help = require('./lib/help');
const argv = require('minimist')(process.argv, {
    boolean: ['help'],
    string: ['to', 'timeout']
});

if (argv.help) return help();

if (!process.env.TWILIO_ACCOUNT) throw new Error('TWILIO_ACCOUNT env var required');
if (!process.env.TWILIO_TOKEN) throw new Error('TWILIO_TOKEN env var required');

const url = new URL(argv._[2]);

if (!url) {
    console.error('');
    console.error('ERROR: HealthCheck URL Required');
    console.error('');
    help();
    process.exit(1);
} else if (!argv.to || !/^\+1\d{10}$/.test(argv.to)) {
    console.error('');
    console.error('ERROR: valid --to parameter required');
    console.error('');
    help();
    process.exit(1);
} else if (argv.timeout && isNaN(parseInt(argv.timeout))) {
    console.error('');
    console.error('ERROR: valid --timeout parameter must be an integer');
    console.error('');
    process.exit(1);
} else if (argv.periods && isNaN(parseInt(argv.periods))) {
    console.error('');
    console.error('ERROR: valid --periods parameter must be an integer');
    console.error('');
    process.exit(1);
}

const notify = new Notify(url, argv.to);

cron.schedule('* * * * *', test);

let failperiods = 0;

function test() {
    console.error(`ok - ${new Date()}: HealthCheck`);

    request({
        url: url,
        method: 'GET',
        timeout: parseInt(args.timeout) || 500,
        headers: {
            'User-Agent': `hallpass@${pkg.version}`
        }
    }, (err, res) => {
        if (err) {
            console.error(`not ok - ${err}`);

            failperiods++;
            if (failperiods >= (parseInt(argv.periods) || 1)) return notify.me(err);
        } else if (res.statusCode !== 200) {
            console.error(`not ok - ${res.body}`);

            failperiods++;
            if (failperiods >= (parseInt(argv.periods) || 1)) return notify.me(new Error(`${res.statusCode}: ${res.body}`));
        } else {
            failperiods = 0;
        }
    });
}
