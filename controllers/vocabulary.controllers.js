const { response } = require('express');

const { Vocabulary } = require('../models/');

const getVocabulary = async (req, res = response) => {

    try {

        const vocabularys = await Vocabulary.find();

        res.json({
            ok: true,
            vocabularys,
            total: vocabularys.length
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }

}

const VocabularyCRUD = async (req, res = response) => {
    try {


        const { extractSheets } = require("spreadsheet-to-json");


        // Scacamos el listado de keys actuales en la base de datos
        const vocabularys = await Vocabulary.find();

        const VocabularysKeys = vocabularys.map(v => { return v.key });
        console.log(VocabularysKeys);



        // optional custom format cell function
        const data = await extractSheets({
            spreadsheetKey: process.env.SPREADSHEEKEY,
            credentials: require("../assets/client_secret.json"),
            sheetsToExtract: ["vocabulary"],
        });

        // Filtramos la data que este como new y que el key no se encuentre en la base de datos
        // para dejar solo los nuevos
        const newVocabulary = await data.vocabulary.filter(d => {
            return d.action === "new" && !VocabularysKeys.includes(d.key)
        });

        await Vocabulary.insertMany(newVocabulary);


        /**
         * Actualizar 
         */
        const updateVocabulary = await data.vocabulary.filter(d => {
            return d.action === "update" && VocabularysKeys.includes(d.key)
        });


        console.log(updateVocabulary);

        updateVocabulary.forEach(async v => {
            await Vocabulary.findOneAndUpdate({key: v.key}, v)
        });



        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }
}


module.exports = {
    getVocabulary,
    VocabularyCRUD
}