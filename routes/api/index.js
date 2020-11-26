const express = require('express');
const router = express.Router();

// Index page route
router.get("/", (req, res) => {
    console.log("Respoding to root request");
    res.send("Hello from the other side");
});

module.exports = router;