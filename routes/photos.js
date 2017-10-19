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
  });
});

//create new gallery photo and post to gallery
router.post('/', (req, res) => {
  const author = req.body.author;
  const link = req.body.link;
  const description = req.body.description;

  return Photo.create({ author: author, link: link, description: description})
    .then(newPhoto => {
      // //res.render()
      return res.redirect('/gallery');
    })
    .catch((err) => {
      console.log(err);
    });
});

//get new photo
router.get('/new', (req, res) => {
  res.render('./new');
});

//get photo by id in gallery
router.get('/:id', (req, res) => {
  const photoId = req.params.id;

  return Photo.findById(photoId)
  .then(photo => {
    console.log('photo.datavalues', photo.dataValues);
    let locals = photo.dataValues;
    return res.render('./photo', locals);
  });
});

router.put('/:id', (req, res) => {
  let newInfo = req.body;
  let photoId = req.params.id;
  return Photo.findById(photoId)
  .then(photo => {
    return Photo.update(newInfo, {
      where: [{id: photoId}]
    })
    .then(photo => {
      return res.redirect(`/gallery/${photoId}`);
    });
  });
});

router.delete('/:id', (req, res) => {
  let photoId = req.params.id;
  return Photo.findById(photoId)
  .then(photo => {
    return Photo.destroy({
      where: [{id: photoId}]
    })
    .then(photo => {
      return res.redirect('/gallery');
    });
  });
});

//render edit page for photos
router.get('/:id/edit', (req, res) => {
  const photoId = req.params.id;
  console.log(req.params.id);
  return Photo.findById(photoId)
    .then(photo => {
      let locals = photo.dataValues;
      return res.render('./edit', locals);
    });
});

module.exports = router;
