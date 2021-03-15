const { CronJob } = require('cron');
const logger = require('./logHelper');

const startJob = (cronTab, callback) => {
    try {
        new CronJob(cronTab, () => {
            callback()
                .catch((err) => {
                    logger.error('CRON', err);
                });
        }).start();

    } catch (err) {
        console.log(err);
    }

};

module.exports = {
    startJob,
}