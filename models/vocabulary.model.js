const { Schema, model } = require('mongoose');


const VocabularySchema = Schema({
    key: {
        type: String,
        required: true,
        unique:true
    },
    englishWord: {
        type: String,
        required: true,
        unique: false
    },
    spanishWord: {
        type: String,
        required: true,
        unique: false
    },
    audio: {
        type: String,
        required: false,
        unique: false
    },
    img: {
        type: String,
        required: true,
        unique: false
    },
    statistics: {
        type: [Object],
        required: true,
        unique: false
    },
    category: {
        type: [String],
        required: true,
        unique: false
    },
    creationDate: {
        type: String,
        required: [true, 'creationDate is required'],
    }

});


VocabularySchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Vocabulary', VocabularySchema);

