const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

router.get('/', queryController.getQueries);
router.get('/:id', queryController.getQueryById);         // NEW
router.post('/', queryController.createQuery);
router.put('/:id', queryController.updateQuery);
router.post('/:id/reply', queryController.replyToQuery);  // NEW
router.delete('/:id', queryController.deleteQuery);
router.post("/:id/reply", queryController.replyToQuery);

module.exports = router;
