const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { catchErrors } = require('../handlers/errorHandlers');

/* API ROUTER */
router.post('/notes', catchErrors(notesController.addNote));

router.delete('/notes/:id', catchErrors(notesController.remove));

router.get('/notes', catchErrors(notesController.get));

router.get('/notes/:id', catchErrors(notesController.getById));

router.put('/notes/:id', catchErrors(notesController.updateById));

router.patch('/notes/:id', catchErrors(notesController.updateById));

module.exports = router;
