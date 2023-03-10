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
  function show(req, res) {
    //where does my id come from? 
    //why does params.id work > because it comes from our router which get the id by the /:id route
    Taco.findById(req.params.id)
    //why do we populate the owner
    //we have all the tacos we use the id to refrence the taco object by id
    .populate("owner")
    .then(taco => {
      //console.log(taco) to see the taco object
      res.render('tacos/show', {
        taco,
        title: "🌮 show"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/tacos')
    })
  }

  function flipTasty(req, res) {
    Taco.findById(req.params.id)
    .then(taco => {
      //flip the value of tasty 
      //what is the value of tasty 
      //!! changes the value to the opposite of what it was >true to false -- false to true
      taco.tasty = !taco.tasty
      taco.save()
      //() or taco either works -- we are just not using it now but we will be in react
      //if you populate something after you save it -- that is where this will be useful 
      .then(()=> {
        //anytime you are changing data you want to do a redirect
        //where do i redirect?
        res.redirect(`/tacos/${taco._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/tacos')
    })
  }

  function edit(req, res) {
    Taco.findById(req.params.id)
    .then(taco => {
      res.render('tacos/edit', {
        taco,
        title: "edit 🌮"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/tacos')
    })
  }

  function update(req, res) {
    Taco.findById(req.params.id)
    .then(taco => {
      //is this the user that own this taco
      if (taco.owner.equals(req.user.profile._id)) {
        //the person making the request owns the taco
        //if they do make the update 
        //if not throw erroe
        req.body.tasty = !!req.body.tasty
        taco.updateOne(req.body, {new: taco})
        .then(()=> {
          res.redirect(`/tacos/${taco._id}`)
        })
      } else {
        throw new Error('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/tacos`)
    })
  }

  function deleteTaco(req, res) {
    Taco.findById(req.params.id)
    .then(taco => {
      if (taco.owner.equals(req.user.profile._id)) {
        taco.delete()
        .then(() => {
          res.redirect('/tacos')
        })
      } else {
        throw new Error ('🚫 Not authorized 🚫')
      }   
    })
    .catch(err => {
      console.log(err)
      res.redirect('/tacos')
    })
  }

export {
  index,
  create,
  show,
  flipTasty,
  edit,
  update,
  deleteTaco as delete,
}