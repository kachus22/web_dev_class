const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = require('./routes');
app.use(express.json())
app.use('/', router);

require('./db/mongoose')

// function connect() {
//   mongoose.connection
//     .on('error', console.log)
//     .on('disconnected', connect)
//     .once('open', listen);
//   return mongoose.connect(config.db, { keepAlive: 1, useNewUrlParser: true });
// }

// require('./db/mongoose')
// const Person = require('./models/person')

// app.post('/persons', function(req, res){
//   const user = new Person(req.body)
//   user.save().then(function() {
//     return res.send(user)
//   }).catch(function(error) {
//     return res.status(400).send(error)
//   })
// })

// app.get('/persons/:id', function(req, res) {
//   const _id = req.params.id
//   User.findById(_id).then(function(user) {
//     if(!user){
//       return res.status(404).send()
//     }
//     return res.send(user)
//   }).catch(function(error) {
//     return res.status(500).send(error)
//   })
// })

// app.get('/persons', function(req, res) {
//   User.find({}).then(function(users) {
//     res.send(users)
//   }).catch(function(error){
//     res.status(500).send(error)
//   })
// })

// patch chafa
// app.patch('/users/:id', function(req, res) {
//   const _id = req.params.id
//   const body = req.body
//   // const name = req.body.name
//   User.findByIdAndUpdate(_id, { age: body.age, name: body.name }).then(function(user) {
//     if (!user) {
//       return res.status(404).send()
//     }
//     return res.send(user)
//   }).catch(function(error) {
//     res.status(500).send(error)
//   })
// })

// patch cool
// app.patch('/users/:id', function(req, res) {
//   const _id = req.params.id
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['name', 'age', 'password', 'email']
//   // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
//   const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

//   if( !isValidUpdate ) {
//     return res.status(400).send({
//       error: 'Invalid update, only allowed to update: ' + allowedUpdates
//     })
//   }
//   User.findByIdAndUpdate(_id, req.body ).then(function(user) {
//     if (!user) {
//       return res.status(404).send()
//     }
//     return res.send(user)
//   }).catch(function(error) {
//     res.status(500).send(error)
//   })
// })

// app.delete('/users/:id', function(req, res) {
//   const _id = req.params.id
//   User.findByIdAndDelete(_id).then(function(user){
//     if(!user) {
//       return res.status(404).send()
//     }
//     return res.send(user)
//   }).catch(function(error) {
//     res.status(505).send(error)
//   })
// })

app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})