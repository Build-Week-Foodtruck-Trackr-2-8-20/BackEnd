const router = require("express").Router();
const diners = require("./users-model.js");

router.get('/', (req, res) => {
    diners.findDiners()
    .then(diners => {
      res.json(diners);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get diners' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  diners.findDinersById(id)
    .then(diners => {
      const diner = diners[0];
      if (diner) {
        res.json(diner);
      } else {
        res.status(404).json({ message: 'Could not find diner with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get diner' });
    });
});

router.post('/addfavtruck', (req, res) => {
  const favTruckData = req.body;

  diners.addFavoriteTruck(favTruckData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to add fav truck' });
    });
});

router.delete('/removefavtruck', (req, res) => {
  const favTruckData = req.body;

  diners.removeFavoriteTruck(favTruckData)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find fav truck' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete truck' });
    });
});

module.exports = router;