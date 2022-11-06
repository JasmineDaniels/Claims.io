const router = require('express').Router();
const { getAllUsers, createNewUser, userLogin, refreshUserToken, userLogout, getOneUser, updateUser } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth');

router.route('/')
    .post(createNewUser)
    .get(getAllUsers);

router.route('/login').post(userLogin);
router.route('/refresh').get(refreshUserToken);
router.route('/logout').get(userLogout);

router.route('/user')
    .get(authMiddleware, getOneUser)
    .put(updateUser);
    // .delete(authMiddleware, deleteUser);


module.exports = router;