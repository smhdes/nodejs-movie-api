const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema=new Schema({
director_id:Schema.Types.ObjectId,
title:
{
    type:String,
    required:[true,'`{PATH}` alanı zorunludur'],
    minlength:[5,'`{PATH}` alanı (`{VALUE}`) değeri {MINLENGTH} karakterden küçük olamaz']
},
category:String,
country:String,
year:Number,
imdb_score:Number,
createdAt:{
    type:Date,
    default:Date.now
}
});

module.exports=mongoose.model('movie',MovieSchema);