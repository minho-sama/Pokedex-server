const Pokemon = require('../models/pokemonModel')
const {body, validationResult} = require('express-validator')

const index = async (req, res, next) => {
    try{
        const pokemon_list = await Pokemon.find().populate('type')
        return res.json(pokemon_list)
    }catch(err){
        return res.json({message: err.message})
    }
}

const pokemon_get = async (req, res) => {
    try{
        const pokemon = await Pokemon.findById(req.params.id).populate('type')
        return res.json(pokemon)
    }catch(err){
        return res.json({message:err.message})
    }
}

const pokemon_create = [
    body('name').trim().isLength({min: 1}).withMessage('Pokemon name must be at least 1 character'),
    body('description').optional({checkFalsy:true}),
    body('height').optional({checkFalsy:true}),
    body('weight').optional({checkfalsy:true}),

    async (req, res, next) => {
        const errors = validationResult(req)
        const pokemon = new Pokemon({
            name: req.body.name,
            description: req.body.description,
            height: req.body.height,
            weight: req.body.weight,
            type: req.body.type,
            img_url: req.body.img_url
        })
        if(!errors.isEmpty()){
            res.json(errors.array())
        } else{
            try{
                const savedPokemon = await pokemon.save()
                //res.redirect? kell egyáltalán redirect?
                return res.json(savedPokemon)
            } catch(err){
                return res.json({message:err.message})
            }
        }
    }

]

const pokemon_update = [
    body('name').trim().isLength({min: 1}).withMessage('Pokemon name must be at least 1 character'),
    body('description').optional({checkFalsy:true}),
    body('height').optional({checkFalsy:true}),
    body('weight').optional({checkfalsy:true}),

    async (req, res, next) => {
        const errors = validationResult(req)
        const pokemon = new Pokemon({
            name: req.body.name,
            description: req.body.description,
            height: req.body.height,
            weight: req.body.weight,
            type: req.body.type,
            img_url: req.body.img_url
        })
        if(!errors.isEmpty()){
            return res.json(errors.array())
        } else{
            try{
                const updatedPokemon = await Pokemon.updateOne({_id:req.params.id}, {$set: {
                    name: req.body.name,
                    description: req.body.description,
                    height: req.body.height,
                    weight: req.body.weight,
                    type: req.body.type,
                    img_url: req.body.img_url
                }})
                return res.json(updatedPokemon)
            } catch(err){
                return res.json({message: err.message})
            }
        }
    }
]

const pokemon_delete = async (req, res) => {
    try{
        const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id)
        return res.json(deletedPokemon)
    }catch(err){
        return res.json({message:err.message})
    }
}

module.exports = {
    index, 
    pokemon_get,
    pokemon_create,
    pokemon_update,
    pokemon_delete
}