const express = require('express');
const server = express();
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

server.use(express.json());
server.use("/api/post", postRouter);
server.use("/api/user", userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request Made`);
  next();
}

module.exports = server;
