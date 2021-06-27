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


//megpróbálni async modullal is! vagy először csak az egyik adatot! 
//nemtom h a modelllel van a baj, vagy a Promise.all-lal!
const type_delete = async (req, res, next) => {
    try{
        const data = Promise.all([
            await Type.findById(req.params.id),
            await Pokemon.find({type: req.params.id})
        ])
        console.log(req.params.id)
        console.log(data[0])
        console.log(data[1])
        return res.json(data)
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