const express = require('express');
const menuItems = require('./menuitems-model.js');
const restricted = require("../auth/authenticate-middleware.js");
const checkRole = require('../auth/check-role-middleware.js');
const router = express.Router();
const OPERATOR = 1;
const DINER = 2;

router.get('/', (req, res) => {
    menuItems.find()
    .then(menuitems => {
      res.json(menuitems);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get menu items' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  menuItems.findById(id)
    .then(menuitems => {
      const menuitem = menuitems[0];
      if (menuitem) {
        res.json(menuitem);
      } else {
        res.status(404).json({ message: 'Could not find menuitem with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get menuitem' });
    });
});

router.get('/:id/ratings', (req, res) => {
    const { id } = req.params;
    
    menuItems.findMenuItemRatings(id)
      .then(ratings => {
        res.json(ratings);
      })
      .catch(err => {
        res.status(500).json({ message: 'problem with the db', error: err });
      });
  });

router.get('/:id/photos', (req, res) => {
    const { id } = req.params;

    menuItems.findMenuItemPhotos(id)
    .then(photos => {
    res.json(photos);
    })
    .catch(err => {
    res.status(500).json({ message: 'problem with the db', error: err });
    });
});

router.post('/', (req, res) => {
  const menuItemData = req.body;

  menuItems.add(menuItemData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new menu item' });
    });
});

router.post('/:id/ratings', (req, res) => {
    const { id } = req.params;
    const ratingsData = req.body;
    menuItems.addMenuItemRating(ratingsData)
      .then(ids => {
        menuItems.findMenuItemRatingsArray(id)
        .then(ratings => {
            let ratingsArray = ratings[0].ratings.split(",");
            let ratingSum = ratingsArray.reduce((a,b)=>{return a + parseInt(b)},0);
            let ratingAvg = Math.round(ratingSum/ratingsArray.length);
            const changes = {"customerRatingAvg": ratingAvg};
            menuItems.update(changes, id)
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

router.post('/:id/photos', (req, res) => {
    const menuItemPhoto = req.body;
  
    menuItems.addMenuItemPhoto(menuItemPhoto)
      .then(ids => {
        res.status(201).json({ created: ids[0] });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create new menu photo' });
      });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  menuItems.update(changes, id)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: 'Could not find menu item with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update menu item' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  menuItems.remove(id)
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
    
    menuItems.removeMenuItemRating(id)
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

    // menuItems.findMenuItemID(id)
    // .then(menuItemID => {
    //     menuItems.removeMenuItemRating(id)
    //     .then(ids => {
    //         menuItems.findMenuItemRatingsArray(menuItemID.menuitemid)
    //         .then(ratings => {
    //             let ratingsArray = ratings[0].ratings.split(",");
    //             let ratingSum = ratingsArray.reduce((a,b)=>{return a + parseInt(b)},0);
    //             let ratingAvg = Math.round(ratingSum/ratingsArray.length);
    //             const changes = {"customerRatingAvg": ratingAvg};
    //             console.log("update obj: ", changes);
    //             menuItems.update(changes, id)
    //             .then(count => {
    //                 if (count) {
    //                     res.status(201).json({ created: ids[0] });
    //                 } else {
    //                 res.status(404).json({ message: 'problem with the db', error: err });
    //                 }
    //             })
    //         })
    //     })
    // })
    // .catch(err => {
    //     res.status(500).json({ message: 'problem with the db', error: err });
    // });

});

router.delete('/photos/:id', (req, res) => {
    const { id } = req.params;
  
    menuItems.removeMenuItemPhoto(id)
      .then(count => {
        if (count) {
          res.json({ removed: count });
        } else {
          res.status(404).json({ message: 'Could not find photo with given id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete photo' });
      });
  });


module.exports = router;