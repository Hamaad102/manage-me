const router = require('express').Router();
const itemController = require('../controllers/itemController');

// Retrieve Items
router.get('/list', itemController.list_get);

// Add Item
router.post('/add', itemController.add_post);

// Edit Item
router.post('/edit', itemController.edit_post);

// Delete Item
router.post('/delete', itemController.item_delete);

// Categories

// Retreieve Categories
router.get('/categories', itemController.category_get);

// Add First Category
router.post('/categories/add', itemController.category_add);

// Add more Categories, Edit or Remove Them
router.post('/categories/edit', itemController.category_edit);

module.exports = router;