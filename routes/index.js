const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { catchErrors } = require('../handlers/errorHandlers');

/* API ROUTER CONTROLLER */
//? ANDA post request addNote
router.post('/notes', catchErrors(notesController.addNote));

//? ANDA note by id
router.delete('/notes/:id', catchErrors(notesController.remove));

//? ANDA get Notes
router.get('/notes', catchErrors(notesController.get));

//? ANDA getById
router.get('/notes/:id', catchErrors(notesController.getById));

//? ANDA updateNoteById complete and partial
router.put('/notes/:id', catchErrors(notesController.updateById));
router.patch('/notes/:id', catchErrors(notesController.updateById));

module.exports = router;
