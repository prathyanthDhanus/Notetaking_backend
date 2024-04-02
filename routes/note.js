 const note = require("../controllers/note");
 const express = require("express");
 const router = express.Router();
 const tryCatch = require("../middleware/tryCatch");


router 
.post('/create/note/:id',tryCatch(note.createNote))
.get('/get/note/:id',tryCatch(note.getNotes))
.get('/get/one/note/:id',tryCatch(note.getAnote))
.put('/update/note/:id',tryCatch(note.updateNote))
.patch('/delete/note/:id',tryCatch(note.deleteNote))





 module.exports = router

 