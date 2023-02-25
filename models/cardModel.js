const mongoose = require('mongoose');
const validator = require('validator');


const cardSchema = new mongoose.Schema({
  
company_name:{
  type:String,
  required:[true,"Must submit name"],
  minlength:[2,"Must use 2 characters"],
  maxlength:[30,"Max character amount is 30"],

},
user_id:{
  type:String
},
business_description:{
  type:String,
  maxlength:1000
},
business_address:{
  type:String,
  maxlength:100
},
phone:{
type: String,
    required: [true, 'Please submit a phone number.'],
    match: [/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Enter a valid phone number']
},
photo:{
  type:String
  },
  card_num:{
  type:Number,
  unique:[true,"something went wrong, try again"],
  default:()=> Math.floor(1000000+Math.random()*900000)
  },
  createdAt:{
  type:Date,
  default:Date.now()
  }


});

const Card = mongoose.model("card",cardSchema,"cards")

module.exports = Card;