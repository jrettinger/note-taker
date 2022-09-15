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

/*
    route - /api/notes
    method - GET
    access - public
*/
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", function (err, data) {
    if (err) {
      res.json([]);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

/*
    route - /api/notes
    method - POST
    access - public
*/
app.post("/api/notes", (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: shortid.generate(),
  };
  fs.readFile("./db/db.json", "utf-8", function (err, data) {
    if (err) {
      res.json({ success: false });
    } else {
      data = JSON.parse(data);
      data.push(newNote);
      fs.writeFileSync("./db/db.json", JSON.stringify(data));
      res.json(newNote);
    }
  });
});

/*
    route - /api/notes/:id
    method - DELETE
    access - public
*/
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./db/db.json", "utf-8", function (err, data) {
    if (err) {
      res.json({ success: false });
    } else {
      data = JSON.parse(data);
      data = data.filter((post) => post.id != id);
      fs.writeFileSync("./db/db.json", JSON.stringify(data));
      res.json({ success: true });
    }
  });
});

/*
    route - *
    method - GET
    access - public
*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
