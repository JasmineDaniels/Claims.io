const router = require('express').Router();
const { getAllUsers, createNewUser, userLogin, refreshUserToken, userLogout, getOneUser, updateUser } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth');

router.route('/')
    .post(createNewUser)
    .get(getAllUsers);

router.route('/login').post(userLogin);
router.route('/refresh').get(refreshUserToken);
router.route('/logout').get(userLogout);

router.route('/:_id') //change to _id params
    .get(authMiddleware, getOneUser)
    .put( authMiddleware, updateUser);
    // .delete(authMiddleware, deleteUser);


module.exports = router;