const router = require('express').Router();
const { getAllEmployees, getOneEmployee, createNewEmployee, employeeLogin, employeeLogout, updateEmployee, addClient, removeClient, getClients, updateClient, refreshEmployeeToken, getClaims } = require('../../controllers/employee-controller');
const { getAClaim, createAClaim, updateAClaim, deleteAClaim, getAllClaims } = require('../../controllers/claims-controller');
const { getOneUser } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth');
const { Admin } = require('../../utils/rolesList')
const verifyRoles = require('../../utils/verifyRoles');


router.route('/')
    .get(getAllEmployees)
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

router.route('/:_id/client')
    .get(authMiddleware, getClients) 

//router.route('/client/:_id') 
router.route('/:_id/client/:client_id') 
    .get(authMiddleware, getOneUser)
    .post(authMiddleware, addClient) 
    .put(authMiddleware, updateClient)
    .delete(authMiddleware, removeClient)

router.route('/:_id/claims')
    .get(authMiddleware, getClaims)


router.route('/claims/:_id') 
    .get(getAClaim) 
    .put(updateAClaim) 
    .delete(authMiddleware, verifyRoles(Admin), deleteAClaim); 



    
module.exports = router;