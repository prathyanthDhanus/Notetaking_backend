 const note = require("../controllers/note");
 const express = require("express");
 const router = express.Router();
 const tryCatch = require("../middleware/tryCatch");


router 
.post('/notes',tryCatch(note.createNote))
.get('/notes',tryCatch(note.getNotes))
.get('/notes/:id',tryCatch(note.getAnote))
.put('/notes/:id',tryCatch(note.updateNote))
.patch('/notes/:id',tryCatch(note.deleteNote))








    



 module.exports = router

 