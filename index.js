const pkg = require('./package.json');
const request = require('request');
const cron = require('node-cron');
const Notify = require('./lib/notify');
const help = require('./lib/help');
const argv = require('minimist')(process.argv, {
    boolean: ['help']
});

if (argv.help) return help();

const url = argv._[2];

const notify = new Notify();

if (!url) {
    console.error('');
    console.error('ERROR: HealthCheck URL Required');
    console.error('');
    help();
    process.exit(1);
}

cron.schedule('* * * * *', () => {
    console.error('ok - testing site');

    request({
        url: url,
        method: 'GET',
        headers: {
            'User-Agent': `hallpass@${pkg.version}`
        }
    }, (err, res) => {
        if (err) {
            console.error(err);
            return notify.me(err);
        }

        if (res.statusCode !== 200) {
            console.error(res.body);
            return notify.me(new Error(`${res.statusCode}: ${res.body}`));
        }
    });
});
