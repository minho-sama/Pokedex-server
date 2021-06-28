const express = require('express');
const router = express.Router();

const pokemon_controller = require('../controllers/pokemonController')
const type_controller = require('../controllers/typeController')

//pokemons

router.post('/pokemon/create', pokemon_controller.pokemon_create)

// //USE MIDDLEWARE (WDS)-ask for password
// //this is only for the actual update. On the front end, to have the info of the type client want to update, use get method to pre-fill the form

router.patch('/pokemon/:id/update', pokemon_controller.pokemon_update)

router.delete('/pokemon/:id/delete', pokemon_controller.pokemon_delete)

router.get('/pokemon/:id', pokemon_controller.pokemon_get)

router.get('/pokemons', pokemon_controller.index)

//TYPES

//(get all types)
router.post('/type/create', type_controller.type_create)

//USE MIDDLEWARE (WDS)-ask for password 
router.patch('/type/:id/update', type_controller.type_update)

router.delete('/type/:id/delete', type_controller.type_delete)

router.get('/type/:id', type_controller.type_get)

router.get('/types', type_controller.type_list);

module.exports = router;