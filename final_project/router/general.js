const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  if (!req.body.username || !req.body.password) {
    console.log(req.body);
    res.status(400).send("Username and password are required");
  }

  for (let user of users) {
    if (user.username === req.body.username) {
      res.status(409).send("Username already exists");
    }
  }
  users.push({"username":req.body.username,"password":req.body.password});
  return res.status(200).send(`User ${req.body.username} successfully registered. Now you can login`);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  booksPromise = new Promise((resolve, reject) => {
    resolve(books);
  });
  booksPromise.then((books) => {
    res.send(books);
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  booksPromise = new Promise((resolve, reject) => {
    resolve(books);
  });
  booksPromise.then((books) => {
    res.send(books[req.params.isbn]);
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  booksPromise = new Promise((resolve, reject) => {
    resolve(books);
  });
  booksPromise.then((books) => {
    let matchedBooks = [];
  for (let book in books) {
    if (books[book].author === req.params.author) {
      matchedBooks.push(books[book]);
    }
  }
  res.send(matchedBooks)
  });

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let matchedBooks = [];
  for (let book in books) {
    if (books[book].title === req.params.title) {
      matchedBooks.push(books[book]);
    }
  }
  res.send(matchedBooks)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  res.send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
