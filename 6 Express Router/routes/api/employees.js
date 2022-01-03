const express = require('express');
const router = express.Router();
const path = require('path');

const data = {};

// Database simulation
data.employees = require('../../data/employees.json' )

// Http methods all chained to same route router
router.route('/')
  .get((req, res) => {
    res.json(data.employees)
  })
  .post((req, res) => {
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname
    })
  })
  .put((req, res) => {
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname
    })
  })
  .delete((req, res) => { 
    res.json({ "id": req.body.id }) 
  });

// We could have a parameter directly in the url
router.route('/:id')
  .get((req, res) => {
    res.json({ "id": req.params.id })
  })
  

module.exports = router;