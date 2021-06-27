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
                res.json(savedType)
            } catch(err){
                res.json({message:err})
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
            Type.findByIdAndDelete(req.params.id, () =>res.json(data))
        })
    } catch(err) {
        res.json({message: err})
    }
}

const type_get = async (req, res, next) => {
    try{
        const type = await Type.findById(req.params.id)
        res.json(type)
    }catch(err){
        res.json({message:err})
    }
}

module.exports = {
    type_create,
    // type_update,
    type_delete,
    type_get,
    // index
}