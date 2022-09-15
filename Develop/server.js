const PORT = 3000;

const express = require("express");
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const app = express();

// middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
/*  
    route - /notes
    method - GET
    access public
*/

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  