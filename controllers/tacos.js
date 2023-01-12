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

  function create(req, res) {
    //make sure to console.log(req.body) and console.log(req.user, "THE USER MAKING THE REQUEST")
    //ask what is being returned on req.body > should be the name: "whatever name is" tasty: "either on or shows nothing"
    req.body.owner = req.user.profile._id
    //console.log(req.body) again
    //ask before adding this code
    req.body.tasty = !!req.body.tasty
    Taco.create(req.body)
    .then(taco => {
      res.redirect('/tacos')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/tacos')
    })
  }

export {
  index,
  create
}