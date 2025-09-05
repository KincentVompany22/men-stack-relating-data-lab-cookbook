/* ------ MODULES ------ */

const express = require("express")
const router = express.Router()

const User = require("../models/user.js")

/* ------ ROUTER LOGIC ------ */
// "/users/:userId/foods" is the prefix for all routes
    // established in server.js

// GET ROUTES

// Foods Index Page Route
router.get("/", async (req, res) => {
    try { 
        const currentUser = await User.findById(req.session.user._id) // Look up the user from req.session
        res.render("foods/index.ejs", { pantry: currentUser.pantry, })
        console.log(currentUser.pantry)
    } catch (error) {
        console.log(error) // If any errors, log them and 
        res.redirect("/") // redirect back home
    }
})

// New Food Form Display Route
router.get("/new", (req, res) => {
    res.render("foods/new.ejs")
})

// Show Route: Display Food Details
router.get("/:foodId", async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user._id)
    const currentFood = currentUser.pantry.id(req.params.foodId)
    res.render("foods/show.ejs", { pantry: currentFood, })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

// Edit Food Form Display Route
router.get("/:foodId/edit" , async (req, res) => {
    try{ 
        const currentUser = await User.findById(req.session.user._id)
        const currentFood = currentUser.pantry.id(req.params.foodId)
        res.render("foods/edit.ejs", {pantry: currentFood, })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})




// POST ROUTES

// Adding New Item
router.post("/", async (req, res) => { 
    try {
        const currentUser = await User.findById(req.session.user._id) // Look up the user from req.session
        // console.log(req.body)
        currentUser.pantry.push(req.body) // Push req.body to the pantry array of the current user.
        await currentUser.save() // Save changes to the user.
        res.redirect(`/users/${currentUser._id}/foods`) // Redirect back to the application’s index view
    } catch (error) {
        console.log(error) // If any errors, log them and 
        res.redirect("/") // redirect back home
    }
})


// PUT ROUTES

// Editing Item

router.put("/:foodId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const currentFood = currentUser.pantry.id(req.params.foodId)
        console.log(req.body)
        currentFood.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})



// DELETE ROUTES
router.delete("/:foodId", async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.pantry.id(req.params.foodId).deleteOne()
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})



module.exports = router