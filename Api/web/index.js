const express = require('express');
const router = express.Router();

router.use(express.static(`${__dirname}/build`));
router.use("/*", (req, res, next) => res.sendFile(`${__dirname}/build/index.html`));

module.exports = router;