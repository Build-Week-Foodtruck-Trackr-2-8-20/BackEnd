const router = require("express").Router();
const Operators = require("./users-model.js");

router.get("/", (req, res) => {
    Operators.findOperators()
    .then(operators => {
      res.status(200).json(operators);
    })
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Operators.findOperatorsById(id)
      .then(operators => {
        const operator = operators[0];
        if (operator) {
          res.json(operator);
        } else {
          res.status(404).json({ message: 'Could not find operator with given id.' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get operator' });
      });
  });

module.exports = router;