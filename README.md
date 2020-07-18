<h1 align=center>hallpass</h1>

<p align=center>Check if a service is down and send a Twilio Text</p>

Note: This library was something I threw together for a side project. It works great for my use
case but I wouldn't consider it "production" software. Use at your own risk. Contributions welcome

## Usage

```

Monitor the status of a website and alert the user if it goes down

Usage:
   ./hallpass <HealthCheck URL> [--to <number>]

Environment Variables
   TWILIO_ACCOUNT      The SID of the twilio account to send messages from
   TWILIO_TOKEN        The API token of the twilio account
Options:
   --to <number>       Phone number to text (format +1##########)

```
