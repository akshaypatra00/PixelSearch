const monggose = require("mongoose")


const histryschema = new monggose.Schema({
    userId: {
        type: monggose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    savedData: {
        type: String
    },

    history: {
        type: String
    }
});

const datamodel = monggose.model("data", histryschema);


module.exports = datamodel;