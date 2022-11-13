const router = require('express').Router();
const { getAllEmployees, getOneEmployee, createNewEmployee, employeeLogin, employeeLogout, updateEmployee, addClient, removeClient, getClients, refreshEmployeeToken } = require('../../controllers/employee-controller');
const { getAClaim, createAClaim, updateAClaim, deleteAClaim, getAllClaims } = require('../../controllers/claims-controller');
const { updateUser } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth');
const { Admin } = require('../../utils/rolesList')
const verifyRoles = require('../../utils/verifyRoles');


router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee) // verify Roles (Admin)?
    

router.route('/login').post(employeeLogin);
router.route('/refresh').get(refreshEmployeeToken);
router.route('/logout').get(employeeLogout);


router.route('/agent') //:_id
    .get(getOneEmployee)
    .put(updateEmployee); 
    //.delete() //delete an employee, add auth, add verify roles

router.route('/client') //add auth
    .get(getClients) 
    .post(addClient) 
    .put(updateUser)
    .delete(removeClient)

router.route('/claims') //claim, add auth
    .get(getAllClaims) //add Admin 
    .post(createAClaim);

router.route('/claim') //add auth, /:_id
    .get(getAClaim) 
    .put(updateAClaim) 
    .delete(authMiddleware, verifyRoles(Admin), deleteAClaim); //:_id
    
module.exports = router;