const router = require('express').Router();
const { getAllEmployees, getOneEmployee, createNewEmployee, employeeLogin, employeeLogout, updateEmployee, addClient, removeClient, getClients, updateClient, refreshEmployeeToken, getClaims } = require('../../controllers/employee-controller');
const { getAClaim, createAClaim, updateAClaim, deleteAClaim, getAllClaims } = require('../../controllers/claims-controller');
const { getOneUser } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth');
const { Admin } = require('../../utils/rolesList')
const verifyRoles = require('../../utils/verifyRoles');


router.route('/')
    .get(authMiddleware, getAllEmployees)
    .post(createNewEmployee) // verify Roles (Admin)?

router.route('/claims') 
    .get(getAllClaims)  
    .post(createAClaim);

router.route('/login').post(employeeLogin);
router.route('/refresh').get(refreshEmployeeToken);
router.route('/logout').get(employeeLogout); //if cookies has jwt prop


router.route('/:_id') 
    .get(getOneEmployee)
    .put(authMiddleware, updateEmployee); 
    //.delete() //delete an employee, add auth, add verify roles
    
//get clients by employee id
router.route('/:_id/client')
    .get(authMiddleware, getClients) 

//manage employee clients 
router.route('/:_id/client/:client_id') 
    .get(authMiddleware, getOneUser)
    .post(authMiddleware, addClient) 
    .put(authMiddleware, updateClient)
    .delete(authMiddleware, removeClient)

//manage claims by id (user id, agent id, or claim id)
router.route('/claims/:_id') 
    //.get(getAClaim) 
    .get(authMiddleware, getClaims)
    .put(updateAClaim) 
    .delete(authMiddleware, verifyRoles(Admin), deleteAClaim); 



    
module.exports = router;