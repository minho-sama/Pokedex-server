const Type = require('../models/typeModel')
const Pokemon = require('../models/pokemonModel')
const {body, validationResult} = require('express-validator')

const type_create = [
    body('name').trim().isLength({min:1}).withMessage('name must be at least 1 charachter'),

    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json(errors.array())
        } else{
            const type = new Type({
                name: req.body.name
            })
            try{
                const savedType = await type.save()
                //res.redirect(savedType.url) lehet a redirectet majd FRONTENDEN kell intézni react routerrel! backend CSAKIS adatot küld!!!
                res.json(savedType)
            } catch(err){
                res.json({message:err.message})
            }

        }
    }
]

const type_update = [
    body('name').trim().isLength({min:1}).withMessage('name must be at least 1 character'),

    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json(errors.array())
        } else{
            try{
            const updatedType = await Type.updateOne({_id: req.params.id},{$set: {name: req.body.name}})
            //res.redirect(updatedType.url)
            return res.json(updatedType)
            } catch(err){
                res.json({message:err.message})
            }
        }
    }
]

const type_delete = async (req, res, next) => {
    try{
        Promise.all([
            await Type.findById(req.params.id),
            await Pokemon.find({type: req.params.id}).populate('type')
        ]).then(response => {
            //just for naming
            data = {
                type: response[0],
                pokemons: response[1]
            }
            if(data.pokemons.length > 0) return res.json(data) //type has pokemons, rerender on front end
            Type.findByIdAndDelete(req.params.id, () => {
                // res.redirect('/pokedex/types')
                return res.json(data)
            })
        })
    } catch(err) {
        return res.json({message: err.message})
    }
}

const type_get = async (req, res, next) => {
    try{
        Promise.all([
            await Type.findById(req.params.id),
            await Pokemon.find({type: req.params.id})
        ]).then(result => {
            const data = {
                type: result[0],
                pokemons: result[1]
            }
            return res.json(data)
        })
    }catch(err){
        res.json({message:err.message})
    }
}

const type_list = async (req, res, next) => {
    try{
        const list = await Type.find()
        return res.json(list)
    }catch(err){
        return res.json({message: err.message})
    }
}

module.exports = {
    type_create,
    type_update, //for actually updating it
    type_delete,
    type_get, //+ for getting data before update
    type_list
}