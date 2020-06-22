const router = require('express').Router();
const moment = require('moment');

const Issues = require('../issues/issues-model');

// GET all issues
router.get('/', (req,res) => {
  Issues.find()
    .then(issues => {
      res.status(200).json({ data: issues });
    })
    .catch(err => {
      console.log('GET /', err);
      res.status(500).json({ error: err.message });
    })
});

// GET issues by city
router.get('/search', (req,res) => {
  Issues.findBy(req.query.city.toLowerCase().replace(/\s+/g, '+'))
    .then(issues => {
      if(issues.length < 1) {
        res.status(200).json({ message: "There are no issues in this area" });
      } else {
        res.status(200).json({ data: issues });
      }
    })
    .catch(err => {
      console.log('GET /search', err);
      res.status(500).json({ error: `Unable to retrieve issues with city: ${req.query.city}`});
    })
});

// GET issue by id
router.get('/:id', (req,res) => {
  const { id } = req.params;
  Issues.findById(id)
    .then(issue => {
      if(issue) {
        res.status(200).json(issue);
      } else {
        res.status(404).json({ error: `Unable to find issue with id: ${id}` });
      }
    })
    .catch(err => {
      console.log('GET /:id', err);
      res.status(500).json({ error: err.message });
    })
});

// POST an issue
router.post('/', (req,res) => {
  let issue = req.body;
  if(req.body.title === '' || req.body.description === '') {
    res.status(400).json({ error: "A title and description are required" });
  } else {
    Issues.add({...issue, city: issue.city.toLowerCase(), created_on: moment().format("MMMM Do YYYY"), user_id: req.decodedToken.subject })
      .then(newIssue => {
        res.status(201).json(newIssue);
      })
      .catch(err => {
        console.log('POST /', err);
        res.status(500).json({ error: "Unable to post the issue" });
      })
  }
});

// PUT an issue
router.put('/:id', (req,res) => {
  const { id } = req.params;
  const update = req.body;
  console.log(req.decodedToken.email);
  Issues.findById(id)
    .then(issue => {
      console.log('testing the put for id:', issue);
      if(issue.email === req.decodedToken.email) {
        Issues.edit({...update, city: update.city.toLowerCase(), created_on: moment().format("MMMM Do YYYY")}, id)
          .then(updatedIssue => {
            res.status(200).json(updatedIssue);
          })
          .catch(err => {
            console.log('PUT /:id', err);
            res.status(400).json({ error: "Failed to update the issue" });
          })
      } else {
        res.status(403).json({ message: "Unable to update the issue, you are not the owner" });
      }
    })
    .catch(err => {
      console.log('PUT /:id', err);
      res.status(404).json({ error: `Unable to find an issue with id: ${id}` });
    })
});


// DELETE an issue
router.delete('/:id', (req,res) => {
  const { id } = req.params;
  Issues.findById(id)
    .then(issue => {
      if(issue.user_id === req.decodedToken.subject) {
        Issues.remove(issue.id)
        .then(removed => {
          if(removed) {
            res.status(200).json({ deleted: "The issue was deleted" });
          } else {
            res.status(404).json({ error: "Issue could not be deleted" });
          }
        })
        .catch(err => console.log(err));
      } else {
        res.status(400).json({ message: "Unable to delete the issue, you are not the owner" });
      }
    })
    .catch(err => {
      console.log('DELETE /', err);
      res.status(500).json({ error: "There was an error when deleting the issue. Try again" });
    })
});

module.exports = router;