const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PokemonSchema = new Schema(
    {
        name: {type: String, required: true},
        // description: {type: String, required: true},
        // height: {type:Number, required: true},
        // weight: {type:Number, required: true},
        type: [{type: Schema.Types.ObjectId, ref: 'Type'}],
        // img_url: {type:String, required:true}
    }
) 

    //virtual for book's id
    PokemonSchema
        .virtual('url')
        .get(function(){
            return  `/pokedex/pokemon/${this._id}`
        })

module.exports = mongoose.model('Pokemon', PokemonSchema)