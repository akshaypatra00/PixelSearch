const monggose = require("mongoose")


const schema = new monggose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    }
})





const usermodel =  monggose.model("user" , schema)





// const histryschema = new monggose.Schema({
//     userId: {
//         type: monggose.Schema.Types.ObjectId,
//         ref: "user",
//         required: true
//     },

//     savedData: {
//         type: String
//     },

//     history: {
//         type: String
//     }
// });

// const datamodel = monggose.model("data", histryschema);
module.exports = usermodel