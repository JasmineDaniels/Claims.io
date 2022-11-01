const router = require('express').Router();

const { createNewUser } = require('../../controllers/user-controller')

router.route('/').post(createNewUser)

module.exports = router;