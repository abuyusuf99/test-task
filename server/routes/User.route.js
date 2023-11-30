const {Router} = require("express")
const {userControllers} = require("../controllers/User.controller")

const router = Router()

router.post('/find',userControllers.find)

module.exports = router