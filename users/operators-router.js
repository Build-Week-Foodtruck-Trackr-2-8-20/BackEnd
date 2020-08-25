const router = require("express").Router();
const Operators = require("./users-model.js");

router.get("/", (req, res) => {
    Operators.findOperators()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;