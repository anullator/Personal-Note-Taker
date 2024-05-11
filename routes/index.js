const router = require('express').Router();

// Import router
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;