function help() {
    console.log('');
    console.log('Monitor the status of a website and alert the user if it goes down');
    console.log('');
    console.log('Usage:');
    console.log('   ./hallpass <HealthCheck URL> [--to <number>');
    console.log('');
    console.log('Options:');
    console.log('   --to <number>       Phone number to text (format +1##########)');
    console.log('');
    console.log('');
    return;
}

module.exports = help;
