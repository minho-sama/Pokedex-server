const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PokemonSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String},
        height: {type:Number},
        weight: {type:Number},
        type: [{type: Schema.Types.ObjectId, ref: 'Type'}],
        img_url: {type:String}
    }
) 

    //virtual for book's id
    PokemonSchema
        .virtual('url')
        .get(function(){
            return  `/pokedex/pokemon/${this._id}`
        })

module.exports = mongoose.model('Pokemon', PokemonSchema)