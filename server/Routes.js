const express = require("express");
const router = express.Router();

// get the different CRUD methods 
const Method = require("./Methods");

router.post("/user", Method.createUser);
router.put("/user/:id", Method.updateUser);
router.delete("/user/:id", Method.deleteUser);
router.get("/user/:id", Method.getUserById);
router.get("/users", Method.getUsers);

module.exports = router;