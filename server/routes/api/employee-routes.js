const router = require('express').Router();
const { getAllEmployees, getOneEmployee, createNewEmployee, employeeLogin, employeeLogout, updateEmployee, addClient, removeClient, getClients, updateClient, refreshEmployeeToken } = require('../../controllers/employee-controller');
const { getAClaim, createAClaim, updateAClaim, deleteAClaim, getAllClaims } = require('../../controllers/claims-controller');
const { getOneUser, updateUser } = require('../../controllers/user-controller');
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

router.route('/:_id/client') //add auth
    .get(authMiddleware,getClients) 

//router.route('/client/:_id') //add auth
router.route('/:_id/client/:client_id') //add auth
    .get(authMiddleware, getOneUser)
    .post(authMiddleware, addClient) 
    .put(authMiddleware, updateClient)
    .delete(authMiddleware, removeClient)

router.route('/claims') //claim, add auth
    .get(getAllClaims) //add Admin 
    .post(createAClaim);

router.route('/claim') //add auth, /:_id
    .get(getAClaim) 
    .put(updateAClaim) 
    .delete(authMiddleware, verifyRoles(Admin), deleteAClaim); //:_id
    
module.exports = router;