const router = require('express').Router();
const issues = require('./issues');

router.use('/issues', issues);

module.exports = router;