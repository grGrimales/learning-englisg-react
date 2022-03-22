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

const insertVocabulary = async (req, res = response) => {
    try {

        const { extractSheets } = require("spreadsheet-to-json");

        const { id, name } = req.user

        // Scacamos el listado de keys actuales en la base de datos
        const vocabularys = await Vocabulary.find();

        const VocabularysKeys = vocabularys.map(v => { return v.key });

        // optional custom format cell function
        const data = await extractSheets({
            spreadsheetKey: process.env.SPREADSHEEKEY,
            credentials: require("../assets/client_secret.json"),
            sheetsToExtract: ["new"],
        });


        // Filtramos la data que este como new y que el key no se encuentre en la base de datos
        // para dejar solo los nuevos
        const newVocabulary = await data.new.filter(d => {
            return d.action === "new" && !VocabularysKeys.includes(d.key)
        });



        newVocabulary.forEach((v, i) => {
            newVocabulary[i].category = v.category.split("-");
            newVocabulary[i].creationDate = new Date().toDateString();
            newVocabulary[i].statistics = [{
                "user": name,
                "uid": id,
                numberReproductions: 0,
                numberSuccessful: 0,
                numberFailed: 0,
                average: 0,
                numberAttempts: 0
            }]
        });

        console.log(newVocabulary);

        await Vocabulary.insertMany(newVocabulary);

        res.json({
            ok: true,
            msg: 'vocabulary insertados con exitos en la base de datos'
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
    insertVocabulary
}