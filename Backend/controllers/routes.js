const express = require('express');

const router = express.Router();

const indexRouterV1 = require('./v1/index');

router.use('/v1', indexRouterV1);

module.exports = router;
