const express = require('express');
const Post = require("./postDb.js");
const router = express.Router();

// Following only work for http://localhost:4000/api/post

router.get('/', (req, res) => {
  Post
    .get()
    .then(posts => {
      res.status(201).json({ posts });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The post information could not be retrieved:", err});
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Post
    .getById(id)
    .then(posts => {
      res.status(201).json({ posts });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The post information could not be retrieved:", err});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Post
      .remove(id)
      .then(removed => {
        res.status(201).json({ message: "The post with the specified ID has been removed:", id})
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The post could not be removed:", err});
      });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Post
      .update(id, changes)
      .then(updated => {
        res.status(201).json({ message: "Edit successful:", id, changes})
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the post to the database:", err});
      });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
