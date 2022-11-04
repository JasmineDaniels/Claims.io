const router = require('express').Router();
const { getAllUsers, createNewUser, userLogin, getOneUser, updateUser } = require('../../controllers/user-controller');
const { authMiddleware }= require('../../utils/auth')

router.route('/')
    .get(authMiddleware, getAllUsers)
    .post(createNewUser);

router.route('/login').post(userLogin);

router.route('/user')
    .get(getOneUser)
    .put(updateUser);

module.exports = router;