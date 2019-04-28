const Person = require('../models/person')

const getPeople = function(req, res) {
  Person.find({}).then(function(people) {
    res.json(
      {status: 'SUCCESS 200', 
      info: `Lista de personas encontradas`,
      people: people})
  }).catch(function(error){
    return res.status(500).json([{status: 'ERROR 500', info: `${error}` }])
  })
}

const getPerson = function(req, res) {
  const _id = req.params.id
  Person.findById(_id).then(function(person) {
    if(!person){
      return res.status(404).json([{status: 'ERROR 404', info: `${error}` }])
    }
    res.json(
      {status: 'SUCCESS 200', 
      info: `${person.name} encontrada con id: ${person.id}`,
      people: person})
  }).catch(function(error) {
    return res.status(500).json([{status: 'ERROR 500', info: `${error}` }])
  })
}

const createPerson = function(req, res){
  const person = new Person(req.body)
  person.save().then(function() {
    return res.json(
      {status: 'SUCCESS 200', 
      info: `${person.name} creado/a con id: ${person.id}`,
      person: person})
  }).catch(function(error) {
    return res.status(400).json([{status: 'ERROR 400', info: `${error}` }])
  })
}

const updatePerson = function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'father', 'mother']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).json([
      {status: 'ERROR 400', 
      info: `Campos invalidos, solo se pueden: ${allowedUpdates}` }])
  }
  Person.findByIdAndUpdate(_id, req.body ).then(function(person) {
    if (!person) {
      return res.status(404).send()
    }
    return res.json(
      {status: 'SUCCESS 200', 
      info: `${person.name} actualizado/a con id: ${person.id}`,
      update: req.body,
      old_person: person})
  }).catch(function(error) {
    res.status(500).send(error)
  })
}

const deletePerson = function(req, res) {
  const _id = req.params.id
  Person.findByIdAndDelete(_id).then(function(person){
    if(!person) {
      return res.status(404).json([{status: 'ERROR 404', info: `${error}` }])
    }
    return res.json(
      {status: 'SUCCESS 200', 
      info: `${person.name} borrado/a con id: ${person.id}`,
      person: person})
  }).catch(function(error) {
    return res.status(505).json([{status: 'ERROR 505', info: `${error}` }])
  })
}

module.exports = {
  getPeople : getPeople,
  getPerson: getPerson,
  createPerson : createPerson,
  updatePerson : updatePerson,
  deletePerson : deletePerson
}