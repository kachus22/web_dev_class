const express = require('express')
const Person = require('./models/person')
const router = express.Router()

const persons = require('./controllers/persons.js')

router.get('/persons/:id', persons.getPerson)
router.get('/persons', persons.getPeople)
router.post('/persons', persons.createPerson)
router.patch('/persons/:id', persons.updatePerson)
router.delete('/persons/:id', persons.deletePerson)

module.exports = router

