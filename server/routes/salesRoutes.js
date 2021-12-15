const router = require('express').Router();
const salesController = require('../controllers/salesController');

// Get all sales
router.get('/', salesController.sales_get);

// Add a Sale
router.post('/sale', salesController.sales_post);

// Fulfill online sale
router.post('/fulfill', salesController.fulfill_post);

// Refund a sale
router.post('/refund', salesController.refund_post);

// Refund a sale and delete doc assuming one item is left
router.post('/refund/delete', salesController.refund_delete);

module.exports = router;