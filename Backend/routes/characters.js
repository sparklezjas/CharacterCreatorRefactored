const express = require('express')
const router = express.Router()
const {
    getCharacter,
    getCharacters,
    createCharacter,
    deleteCharacter,
    updateCharacter
} = require('../controllers/characterController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/all', requireAuth, getCharacters)
router.get('/one/:id', requireAuth, getCharacter)
router.post('/new', requireAuth, createCharacter)
router.delete('/delete/:id', requireAuth, deleteCharacter)
router.patch('/edit/:id', requireAuth, updateCharacter)

module.exports = router