const Router = require('express')
const router  = new Router()
const ChamberController = require('../controller/chamber.controller')

router.get('/chamber/:id', ChamberController.getСhamber)
router.get('/chamber/:id/prisoners', ChamberController.getPrisonersFromСhamber)
router.get('/chambers', ChamberController.getСhambers)
router.post('/chamber', ChamberController.creatСhamber)
router.put('/chamber/:id', ChamberController.updateСhamber)

module.exports = router