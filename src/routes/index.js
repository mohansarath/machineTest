const express = require('express');

const commonRoute = require('./commonRouter');
const userRoute = require('./userRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: commonRoute,
    },
    {
        path: '/user',
        route: userRoute,
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;