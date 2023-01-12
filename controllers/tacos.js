import { Taco } from '../models/taco.js'

function index(req, res) {
    Taco.find({})
    .then(tacos => {
      res.render('tacos/index', {
        //locales
        tacos,
        title: "🌮"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

export {
  index,
}