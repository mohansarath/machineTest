// const Joi = require('joi');
// const { ENV } = require('../utils/constantHelper');

// const envVarsSchema = Joi.object()
//   .keys({
//     NODE_ENV: Joi.string().valid(
//       ENV.DEVELOPMENT,
//       ENV.PRODUCTION,
//       ENV.TEST,
//       ENV.STAGING,
//     ).default(ENV.DEVELOPMENT),
//     PORT: Joi.number().default(3000),
//     DB_HOST: Joi.string().required(),
//     DB_USER: Joi.string().optional(),
//     DB_PASS: Joi.string().optional(),
//     DB_NAME: Joi.string().required(),
//     DB_PORT: Joi.number().optional(),
//     DB_OPTIONS: Joi.string().optional(),
//     LOG_TO_FILE: Joi.boolean().default(false),
//     LOG_TO_CONSOLE: Joi.boolean().default(true),
//   })
//   .unknown().custom((object, helpers) => {
//     if (object.DB_TYPE === 'atlas') {
//       if (!object.DB_USER && !object.DB_PASS) {
//         return helpers.message('DB username and password required');
//       }
//     }
//     return object;
//   });

// module.exports = {
//   envVarsSchema,
// };
