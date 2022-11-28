const Router = require('express')
const router = new Router
const PrisonerController  = require('../controller/prisoner.controller')

router.get('/prisoner/:id', PrisonerController.getPrisoner)
router.get('/prisoners', PrisonerController.getPrisoners)
router.post('/prisoner', PrisonerController.createPrisoner)
router.patch('/prisoner/:id', PrisonerController.updatePrisoner)
router.delete('/prisoner/:id', PrisonerController.deletePrisoner)

module.exports = router