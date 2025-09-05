/* ------ MODULES ------ */

const express = require("express")
const router = express.Router()

const User = require("../models/user.js")

// ROUTES
// "/community" is the prefix for all routes
    // established in server.js


// Displays all users  
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find()
        console.log(allUsers)
        res.render("users/index.ejs", { users: allUsers })
    } catch (error) {
        console.log(error) // If any errors, log them and 
        res.redirect("/") // redirect back home
    }
})

// Show Route for Users Pantry Items
router.get("/:userId", async (req, res) => {
    try {
        const communityUser = await User.findById(req.params.userId)
        console.log(communityUser)
        res.render("users/show.ejs", { communityUser }) //same as {user: user}
    } catch (error) {
        console.log(error) // If any errors, log them and 
        res.redirect("/") // redirect back home
    }
})


module.exports = router