const express = require("express");
const multer = require('multer');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.raw({ type: 'text/plain' }));

app.use(multer().any());

app.use("/", express.static(__dirname + '/static'));

var notes = []

app.get("/notes", (req, res) => {
  res.json(notes);
})

app.post("/upload", (req, res) => {
  var note = req.body.note_name

  if(notes.map(a => a.note_name).includes(note)){
    res.sendStatus(400)
  }else{
    notes.push(req.body)
    res.sendStatus(201)
  }
  console.log(notes)
})

app.get("/notes/:noteName", (req, res) =>{
  note = req.params.noteName;
  note_names = notes.map(a => a.note_name); 
  if(note_names.includes(note)){
    res.send(notes[note_names.indexOf(note)].note) 
  }else{
    res.sendStatus(404)
  }
})

app.delete("/notes/:noteName", (req, res) =>{
  note = req.params.noteName;
  note_names = notes.map(a => a.note_name); 
  if(note_names.includes(note)){
    notes.splice(note_names.indexOf(note), 1)
    res.sendStatus(200)
  }else{
    res.sendStatus(404)
  }
})

app.put("/notes/:noteName", (req, res) =>{
  note = req.params.noteName;
  note_names = notes.map(a => a.note_name); 
  if(note_names.includes(note)){
    notes[note_names.indexOf(note)].note = req.body.toString()
    res.sendStatus(200)
  }else{
    res.sendStatus(404)
  }
})

app.listen(8000);
