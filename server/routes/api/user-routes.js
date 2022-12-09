const router = require('express').Router();
const { getAllUsers, createNewUser, userLogin, refreshUserToken, userLogout, getOneUser, updateUser, getClaims } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth');
const { getAClaim, updateAClaim } = require('../../controllers/claims-controller');

router.route('/')
    .post(createNewUser)
    .get(getAllUsers);

router.route('/login').post(userLogin);
router.route('/refresh').get(refreshUserToken);
router.route('/logout').get(userLogout);

router.route('/:_id') 
    .get(authMiddleware, getOneUser)
    .put( authMiddleware, updateUser);
    // .delete(authMiddleware, deleteUser);

//manage claims by id (user id or claim id)
router.route('/claims/:_id') 
    //.get(getAClaim) may not need
    .get(authMiddleware, getClaims)
    .put(updateAClaim)

module.exports = router;