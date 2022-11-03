const router = require('express').Router();
const { getAllEmployees, getAEmployee, createNewEmployee, updateEmployee } = require('../../controllers/employee-controller')
const { getAClaim, createAClaim, updateAClaim, deleteAClaim } = require('../../controllers/claims-controller')

router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee);

router.route('/agent')
    .get(getAEmployee) //employee sign in?
    .delete() //delete A employee

router.route('/claim')
    .get(getAClaim)
    .post(createAClaim)
    .put(updateAClaim)
    .delete(deleteAClaim);
    
module.exports = router;