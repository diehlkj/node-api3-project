const express = require('express');
const User = require("./userDb.js")
const router = express.Router();

// Following only work for http://localhost:4000/api/user

router.post('/', validateUser, (req, res) => {
  const { name } = req.body;
  User
    .insert(name)
      .then(userData => {
        res.status(201).json({ userData });
      })
      .catch(err => {
        res.status(500).json({ message: 'exception', err });
      });
});

// router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
//   const { text } = req.body;
//   const userId = req.params.id;
//   User
//     .???????()
//       .then( p => {
//         res.status(201).json({});
//       })
//       .catch(err => {
//         res.status(500).json({ message: 'exception', err });
//       });
// });

router.get('/', (req, res) => {
  User
    .get()
      .then(userInfo => {
        res.status(201).json({ userInfo });
      })
      .catch(err => {
        res.status(500).json({ message: 'exception', err });
      });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(201).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User
    .getUserPosts(req.user.id)
      .then(posts => {
        res.status(201).json({ posts });
      })
      .catch(err => {
        res.status(500).json({ message: 'exception', err });
      });
});

router.delete('/:id', validateUserId, (req, res) => {
  User
    .remove(req.user.id)
      .then(userData => {
        res.status(201).json({ userData });
      })
      .catch(err => {
        res.status(500).json({ message: 'exception', err });
      });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  User
    .update(id, name)
      .then(userData => {
        res.status(201).json({ id, name });
      })
      .catch(err => {
        res.status(500).json({ message: 'exception', err });
      });
});


// Checks id for any request that is made in relation to a speciffic id
function validateUserId(req, res, next) {
  const { id } = req.params;
  User
    .getById(id)
    .then(userInfo => {
      if (userInfo) {
        req.user = userInfo;
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
