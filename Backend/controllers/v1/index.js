const express = require('express');

const router = express.Router();

const admin = require('./admin/routes');
const shared = require('./shared/routes');

router.use('/admin', admin);
router.use('/shared', shared);

module.exports = router;
