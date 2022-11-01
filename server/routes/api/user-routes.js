const router = require('express').Router();

const { createNewUser, userLogin } = require('../../controllers/user-controller')

router.route('/').post(createNewUser)
router.route('/login').post(userLogin);

module.exports = router;