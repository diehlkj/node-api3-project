const express = require('express');
const User = require("./userDb.js")
const router = express.Router();

// Following only work for http://localhost:4000/api/user

router.post('/', (req, res) => {
  User
    .()
      .then(  => {
        res.status(201).json({});
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "", err});
      });
});

router.post('/:id/posts', (req, res) => {
  User
    .()
      .then(  => {
        res.status(201).json({});
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "", err});
      });
});

router.get('/', (req, res) => {
  User
    .()
      .then(  => {
        res.status(201).json({});
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "", err});
      });
});

router.get('/:id', (req, res) => {
  User
    .()
      .then(  => {
        res.status(201).json({});
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "", err});
      });
});

router.get('/:id/posts', (req, res) => {
  User
    .()
      .then(  => {
        res.status(201).json({});
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "", err});
      });
});

router.delete('/:id', (req, res) => {
  User
    .()
      .then(  => {
        res.status(201).json({});
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "", err});
      });
});

router.put('/:id', (req, res) => {
  User
    .()
      .then(  => {
        res.status(201).json({});
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "", err});
      });
});


// Checks id for any request that is made in relation to a speciffic id
function validateUserId(req, res, next) {
  const { id } = req.params;
  User
    .getById(id)
    .then(data => {
      if (data) {
        req.user = data;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'exception', err });
    });
}

// Checks the body of each request to create a new user
function validateUser(req, res, next) {
  const { name } = req.body;
  if (req.body) {
    if (name) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

// Checks the body of each request to make a new post
function validatePost(req, res, next) {
  const { text } = req.body;
  if (req.body) {
    if (text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
