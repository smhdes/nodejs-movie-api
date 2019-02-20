const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Model of Director

const DirectorSchema=new Schema({
name:String,
surname:String,
bio:String
});

module.exports=mongoose.model('director',DirectorSchema);