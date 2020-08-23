const express = require('express');
const trucks = require('./trucks-model.js');
const router = express.Router();

router.get('/', (req, res) => {
  trucks.find()
    .then(trucks => {
      res.json(trucks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get trucks' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  trucks.findById(id)
    .then(trucks => {
      const truck = trucks[0];

      if (truck) {
        res.json(truck);
      } else {
        res.status(404).json({ message: 'Could not find truck with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get truck' });
    });
});

router.get('/:id/ratings', (req, res) => {
    const { id } = req.params;
    
    console.log("id from the url: ", id);
    trucks.findTruckRatings(id)
      .then(ratings => {
        res.json(ratings);
      })
      .catch(err => {
        res.status(500).json({ message: 'problem with the db', error: err });
      });
  });

router.post('/', (req, res) => {
  const truckData = req.body;

  trucks.add(truckData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new truck' });
    });
});

router.post('/:id/ratings', (req, res) => {
    const ratingsData = req.body;
  
    trucks.addTruckRating(ratingsData)
      .then(ids => {
        res.status(201).json({ created: ids[0] });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create new rating' });
      });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  trucks.update(changes, id)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: 'Could not find truck with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update truck' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  trucks.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find truck with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete truck' });
    });
});

router.delete('/:id/ratings', (req, res) => {
    const { id } = req.params;
  
    trucks.removeTruckRating(id)
      .then(count => {
        if (count) {
          res.json({ removed: count });
        } else {
          res.status(404).json({ message: 'Could not find rating with given id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete rating' });
      });
  });



module.exports = router;