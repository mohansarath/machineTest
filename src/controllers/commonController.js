
const { env } = require('../config/credentials');

const healthCheck = async (req, res) => {
    const response = {
        api: 'machineTest-api',
        env,
        date: new Date().getTime(),
    };
    res.send(response);
};

module.exports = {
    healthCheck,
};
