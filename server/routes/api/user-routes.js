const router = require('express').Router();

const { createNewUser, userLogin, getOneUser, updateUser } = require('../../controllers/user-controller')

router.route('/').post(createNewUser)
router.route('/login').post(userLogin);
router.route('/user').get(getOneUser);
router.route('/user').put(updateUser);

module.exports = router;