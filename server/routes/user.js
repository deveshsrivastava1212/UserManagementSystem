const express = require("express");
const userController = require('../controllers/userController');
const router = express.Router();

//Router
router.get('/', userController.views);
router.post('/', userController.find);
router.get('/adduser', userController.add);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/:id', userController.delete);
router.get('/viewall/:id', userController.viewall);
module.exports = router;