const twilio = require('twilio');

class Notify {
    constructor(url, to) {
        this.client = new twilio(process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN);
        this.url = url;
        this.to = to;

        this.client.incomingPhoneNumbers.list({}, (err, list) => {
            if (err) throw err;
            if (!list.length) throw new Error('No active twilio numbers');
            this.from = list[0].phoneNumber
        });
    }

    async me(err) {
        try {
            await this.client.messages.create({
                body: `${this.url} is down`,
                from: this.from,
                to: this.to
            });

            await this.client.messages.create({
                body: err.message,
                from: this.from,
                to: this.to
            });
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = Notify;
