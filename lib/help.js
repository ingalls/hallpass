function help() {
    console.log('');
    console.log('Monitor the status of a website and alert the user if it goes down');
    console.log('');
    console.log('Usage:');
    console.log('   ./hallpass <HealthCheck URL> [--to <number>] [--timeout <s>] [--period <n>]');
    console.log('');
    console.log('Environment Variables');
    console.log('   TWILIO_ACCOUNT      The SID of the twilio account to send messages from');
    console.log('   TWILIO_TOKEN        The API token of the twilio account');
    console.log('Options:');
    console.log('   --to <number>       Phone number to text (format +1##########)');
    console.log('   --timeout <seconds> Number of seconds to for HTTP response');
    console.log('   --periods <number>  Number of consecutive minutes to fail');
    console.log('');
    console.log('');
    return;
}

module.exports = help;
