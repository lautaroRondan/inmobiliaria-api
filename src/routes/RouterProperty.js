const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/ControllerProperty');

router.post("/register", propertyController.register);
router.post("/search-property", propertyController.searchProperties);
router.get("/list-property", propertyController.getAllProperties);
router.get('/property/:id', propertyController.getPropertyById);


module.exports = router;