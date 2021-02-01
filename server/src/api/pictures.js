const express = require('express');
const Joi = require('joi');

const db = require('../db');
const pictures = db.get('pictures');

const schema = Joi.object().keys({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
//kan ikke validere bildefilene her... 
  prosjekt: Joi.string().min(1).max(100).required(),
  omradeProsjekt: Joi.string().min(1).max(100),
  parsell: Joi.number(),
  orienteringBilde: Joi.number(),
  dato: Joi.date().required(),
  kategori: Joi.string().min(1).max(500),
});

const router = express.Router();

router.get('/', (req, res) => {
  pictures
    .find()
    .then(allPictures => {
    res.json(allPictures);
  })
});

router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if(result.error === null){
    const {latitude, longitude, prosjekt, omradeProsjekt, parsell, orienteringBilde, dato, kategori} = req.body;
    const addPicture = {
      latitude,
      longitude,
      prosjekt,
      omradeProsjekt,
      parsell,
      orienteringBilde,
      dato,
      kategori
    };
    pictures
      .insert(addPicture)
      .then(insertedPicture => {
        res.json(insertedPicture);
      });
  } else {
    next(result.error);
  }
});

module.exports = router;
