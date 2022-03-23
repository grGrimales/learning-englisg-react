const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    categorysVocabulary: {
        type: [String],
        require:false,
        unique: false
    },
    phraseVocabulary: {
        type: [String],
        require:false,
        unique: false
    }
});


CategorySchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Category', CategorySchema);