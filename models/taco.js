import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tacoSchema = new Schema({
  name: String,
  tasty: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true //this section is an option
})

//builds our schema into a model
const Taco = mongoose.model('Taco', tacoSchema)

//dont forget to export
export {
  Taco
}