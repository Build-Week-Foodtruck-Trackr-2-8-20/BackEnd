const express = require('express');
const trucks = require('./trucks-model.js');
const restricted = require("../auth/authenticate-middleware.js");
const checkRole = require('../auth/check-role-middleware.js');
const router = express.Router();
const OPERATOR = 1;
const DINER = 2;

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

router.get('/:id/menuitems', (req, res) => {
  const { id } = req.params;
  
  trucks.findTruckMenuItems(id)
    .then(menuItems => {
      res.json(menuItems);
    })
    .catch(err => {
      res.status(500).json({ message: 'problem with the db', error: err });
    });
});

router.get('/:id/ratings', (req, res) => {
    const { id } = req.params;
    
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
    const { id } = req.params;
    const ratingsData = req.body;
   
    trucks.addTruckRating(ratingsData)
      .then(ids => {
        trucks.findTruckRatingsArray(id)
        .then(ratings => {
            let ratingsArray = ratings[0].ratings.split(",");
            let ratingSum = ratingsArray.reduce((a,b)=>{return a + parseInt(b)},0);
            let ratingAvg = Math.round(ratingSum/ratingsArray.length);
            const changes = {"customerRatingAvg": ratingAvg};
            trucks.update(changes, id)
            .then(count => {
                if (count) {
                    res.status(201).json({ created: ids[0] });
                } else {
                  res.status(404).json({ message: 'problem with the db', error: err });
                }
              })
          })
      })
      .catch(err => {
        res.status(500).json({ message: 'problem with the db', error: err });
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

router.delete('/ratings/:id', (req, res) => {
    const { id } = req.params;

    trucks.findTruckIdByRatingId(id)
    .then(truckid => {
        trucks.removeTruckRating(id)
        .then(count1 => {
          trucks.findTruckRatingsArray(truckid[0].id)
          .then(ratings => {
              if (ratings[0].ratings) {
                let ratingsArray = ratings[0].ratings.split(",");
                let ratingSum = ratingsArray.reduce((a,b)=>{return a + parseInt(b)},0);
                let ratingAvg = Math.round(ratingSum/ratingsArray.length);
                const changes = {"customerRatingAvg": ratingAvg};
                trucks.update(changes, truckid[0].id)
                .then(count2 => {
                    if (count1) {
                        res.status(201).json({ deleted: count1 });
                    } else {
                      res.status(404).json({ message: 'problem with the db', error: err });
                    }
                })
              } else {
                let ratingAvg = 0;
                const changes = {"customerRatingAvg": ratingAvg};
                trucks.update(changes, truckid[0].id)
                .then(count2 => {
                    if (count1) {
                        res.status(201).json({ deleted: count1 });
                    } else {
                      res.status(404).json({ message: 'problem with the db', error: err });
                    }
                })
              }
          })
        })
      })
    .catch(err => {
      res.status(500).json({ message: 'problem with the db', error: err });
    });

});



module.exports = router;