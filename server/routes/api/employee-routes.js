const router = require('express').Router();
const { getAllEmployees, createNewEmployee, updateEmployee } = require('../../controllers/employee-controller')

router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)

module.exports = router;