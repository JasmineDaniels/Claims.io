const router = require('express').Router();
const { getAllEmployees, getOneEmployee, createNewEmployee, employeeLogin, employeeLogout, updateEmployee, addClient, removeClient, getClients } = require('../../controllers/employee-controller');
const { getAClaim, createAClaim, updateAClaim, deleteAClaim } = require('../../controllers/claims-controller');
const { updateUser } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth');


router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee);

router.route('/login').post(employeeLogin);
router.route('/logout').get(employeeLogout);


router.route('/agent')
    .get(authMiddleware, getOneEmployee) 
    .delete() //delete A employee

router.route('/client') //add auth
    .get(getClients)
    .post(addClient)
    .put(updateUser)
    .delete(removeClient)

router.route('/claim')
    .get(getAClaim)
    .post(createAClaim)
    .put(updateAClaim)
    .delete(deleteAClaim);
    
module.exports = router;