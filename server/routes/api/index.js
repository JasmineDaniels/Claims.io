const router = require('express').Router();
const userRoutes = require('./user-routes');
const employeeRoutes = require('./employee-routes');

router.use('/users', userRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;