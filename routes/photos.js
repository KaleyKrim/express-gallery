// jshint esversion: 6

const express = require('express');
const router = express.Router();
const db = require('../models');
const Photo = db.photo;


//get all photos in gallery
router.get('/', (req, res) => {
  return Photo.findAll()
  .then(photos => {
    let locals = { photos : photos};
    return res.render('./index', locals);
  })
  .catch((err) => {
    let message = { message : 'Unable to locate photo! Please try again.'};
    res.render('./error', message);
  });
});

//create new gallery photo and post to gallery
router.post('/', (req, res) => {

  const author = req.body.author;
  const link = req.body.link;
  const description = req.body.description;

  if(link.includes('http')) {
    return Photo.create({ author: author, link: link, description: description, userId: req.user.id})
    .then(newPhoto => {
      return res.redirect('/gallery');
    })
    .catch((err) => {
      let message = { message : 'Sorry, we cannot accept your submission at this time. Please try again'};
      res.render('./error', message);
    });
  }else{
    let message = { message: 'Please submit a valid url'};
    res.render('./error', message);
  }
});


router.get('/new', (req, res) => {
  res.render('./new');
});


router.get('/:id', (req, res) => {
  const photoId = req.params.id;

  return Photo.findAll({
    limit: 4,
    where: {
      id: {
        gte: photoId
      }
    },
  })
  .then(photo => {
    let locals = { mainPhoto : photo[0], photos : [photo[1], photo[2], photo[3]]};

    return res.render('./photo', locals);
  });
});

router.put('/:id', (req, res) => {
  let newInfo = req.body;
  let photoId = req.params.id;

  return Photo.findById(photoId)
  .then(photo => {
    if(req.user.id === photo.userId){
      return Photo.update(newInfo, {
        where: [{id: photoId}]
      })
      .then(photo => {
        return res.redirect(`/gallery/${photoId}`);
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  let photoId = req.params.id;

  return Photo.findById(photoId)
  .then(photo => {
    if(req.user.id === photo.userId){
      return Photo.destroy({
        where: [{id: photoId}]
      })
      .then(photo => {
        return res.redirect('/gallery');
      });
    }
  });
});


router.get('/:id/edit', (req, res) => {
  const photoId = req.params.id;
  return Photo.findById(photoId)
    .then(photo => {
      if(req.user.id === photo.userId){
        let locals = photo.dataValues;
        return res.render('./edit', locals);
      }else{
        let message = { message : `Sorry, you aren't logged in to the account that created this photo. Please log in and try again.`};
        res.render('./error', message);
      }
    });
});

module.exports = router;
