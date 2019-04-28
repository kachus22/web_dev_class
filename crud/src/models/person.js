
const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  born: {
    type: String
  },
  timeline: {
    type: String
  },
  alliegance: [{ 
    type: String 
  }],
  playedBy: { 
    type: String 
  },
  titles: [{ 
    type: String
  }],
  father: { 
    type: String
  },
  mother: { 
    type: String 
  },
  spouse: { 
    type: String 
  }
})

PersonSchema.pre('save', function(next) {
  const person = this
  console.log('PRE SAVING!!!!!!!!!')
  next()
})

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person

