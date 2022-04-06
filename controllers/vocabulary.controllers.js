const { response } = require('express');
const res = require('express/lib/response');
const { randomOrder, orderByLeastPlayed, orderByLeastHits } = require('../helpers/helpers');

const { Vocabulary, Category } = require('../models/');

const listOrder = ["random", "leastplayed", "leasthits"]

const getOrderType = async (req, res = response) => {
    try {

        res.json({
            "order-type": listOrder
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }
}


const getVocabulary = async (req, res = response) => {

    try {

        const { order, category, limit } = req.query;

        const uid = req.user.id;
        let vocabularyOrder = [];


        // Validar que el parametro order este entre los validos
        if (!listOrder.includes(order)) {
            return res.json({
                ok: false,
                msg: "el parametro order debe estar entre: " + listOrder.join(", ")
            });
        }

        // validar que el parametro limit es un numero
        if (limit) {
            const regex = /^[0-9]*$/;
            const onlyNumbers = regex.test(limit);

            if (!onlyNumbers) {
                return res.json({
                    ok: false,
                    msg: `El limit ${limit} no es un número valido`
                });
            }
        }


        // Validamos que la categoria enviada se encuentre en la base de datos
        const categoryDb = await Category.find();
        const listCategoryDb = categoryDb[0].categorysVocabulary

        if (!listCategoryDb.includes(category) && category !== "total") {
            return res.json({
                ok: false,
                msg: `la categoria ${category} no es valida (${listCategoryDb.join(", ")})`
            });
        }
        let vocabularys = [];
        if (category === "total") {

            vocabularys = await Vocabulary.find();

        } else {
            vocabularys = await Vocabulary.find({ "category": { "$in": category } });
        }



        // Prepara las estadisticas para el usuario
        const vocabularyWithStatistics = [];
        vocabularys.forEach(v => {

            // Evalua si el usuario ya tiene estadistica.
            let existe = false;
            v.statistics.forEach(s => { if (s.uid === uid) existe = true });

            // si elusuario existe devuelve las estadisticas, en caso de que no les coloca 0
            v.statistics.forEach(s => {
                if (existe) {
                    if (s.uid == uid) {
                        vocabularyWithStatistics.push({
                            id: v.id,
                            englishWord: v.englishWord,
                            spanishWord: v.spanishWord,
                            audio: v.audio,
                            img: v.img,
                            category: v.category,
                            creationDate: v.creationDate,
                            numberReproductions: s.numberReproductions,
                            numberSuccessful: s.numberSuccessful,
                            numberFailed: s.numberFailed,
                            numberAttempts: s.numberAttempts,
                            average: s.average
                        });
                    }
                } else {
                    vocabularyWithStatistics.push({
                        id: v.id,
                        englishWord: v.englishWord,
                        spanishWord: v.spanishWord,
                        audio: v.audio,
                        img: v.img,
                        category: v.category,
                        creationDate: v.creationDate,
                        numberReproductions: 1111,
                        numberSuccessful: 0,
                        numberFailed: 0,
                        numberAttempts: 0,
                        average: 0
                    });
                }
            });
        });


        // Ordenar el array según el parametro que se envie del frontEnd
        switch (order) {
            case "random":
                vocabularyOrder = randomOrder(vocabularyWithStatistics);
                break;
            case "leastplayed":

                vocabularyOrder = orderByLeastPlayed(vocabularyWithStatistics);
                break;

            case "leasthits":
                vocabularyOrder = orderByLeastHits(vocabularyWithStatistics);

                break;

            default:
                break;
        }

        // Fitrar el array final
        if (limit) {
            if (!Number.isInteger(parseInt(limit))) {
                return res.json({
                    ok: false,
                    msg: `la categoria ${category} no es valida (${listCategoryDb.join(", ")})`
                });
            }
            vocabularyOrder = vocabularyOrder.slice(0, limit)
        }


        res.json({
            ok: true,
            total: vocabularyOrder.length,
            vocabularys: vocabularyOrder
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


const updateVocabulary = async (req, res = response) => {

    try {


        // Extraemos informacion del excel
        const { extractSheets } = require("spreadsheet-to-json");
        const data = await extractSheets({
            spreadsheetKey: process.env.SPREADSHEEKEY,
            credentials: require("../assets/client_secret.json"),
            sheetsToExtract: ["db"],
        });


        // Scacamos el listado de id actuales en la base de datos
        const vocabularys = await Vocabulary.find();
        const vocabularysId = vocabularys.map(v => v.id);

        // Nos quedamos solo con los valores que queremos actualizar y tengan un id valido
        const updateVocabulary = await data.db.filter(d =>
            d.action === "update" && vocabularysId.includes(d.id)
        );

        updateVocabulary.forEach(async u => {
            await Vocabulary.findByIdAndUpdate(u.id, u);
        });

        res.json({
            ok: true,
            msg: "vocabulary actualizado con exito"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }

}

const deleteVocabulary = async (req, res = response) => {

    try {


        const { extractSheets } = require("spreadsheet-to-json");

        // optional custom format cell function
        const data = await extractSheets({
            spreadsheetKey: process.env.SPREADSHEEKEY,
            credentials: require("../assets/client_secret.json"),
            sheetsToExtract: ["db"],
        });

        // Scacamos el listado de keys actuales en la base de datos
        const vocabularys = await Vocabulary.find();

        const VocabularysId = vocabularys.map(v => v.id);

        const deleteVocabulary = await data.db.filter(d =>
            d.action === "delete" && VocabularysId.includes(d.id)
        );

        const idToDelete = deleteVocabulary.map(d => d.id);

        await Vocabulary.deleteMany({ _id: idToDelete })

        res.json({
            ok: true,
            msg: 'Vocabulary eliminadas'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }

}

const getVocabularyCategory = async (req, res = response) => {
    try {

        const category = await Category.find();

        res.json({
            ok: true,
            categoryVocabulary: category[0].categorysVocabulary
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }
}


const updateVocabularyCategory = async (req, res = response) => {
    try {

        await Category.deleteMany();
        const vocabularys = await Vocabulary.find();
        let vocabularyCategorys = ["total"];

        vocabularys.forEach(v => {
            v.category.forEach(c => {

                if (!vocabularyCategorys.includes(c)) {
                    vocabularyCategorys.push(c);
                }
            });
        });

        const category = new Category({
            categorysVocabulary: vocabularyCategorys,
            phraseVocabulary: []
        });

        await category.save();

        res.json({
            ok: true,
            msg: 'Categorias actualizadas cone exito',
            category

        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }
}

const increaseVocabularyNumberReproductions = async (req, res = response) => {


    try {


        const { id } = req.params;
        const vocabulary = await Vocabulary.findById(id);
        const uid = req.user.id;


        // Validamos si el usuario ya ha escuchado este audio o lo creo
        let existe = false;
        vocabulary.statistics.forEach(s => {
            if (s.uid === uid) {
                existe = true;
            }
        });


        // Si existe le aumentamos en 1 la reproducion, en caso de que no le damos valores por defectos

        if (existe) {
            vocabulary.statistics.forEach(s => {
                if (uid === s.uid) {
                    s.numberReproductions += 1
                }

            });
        } else {
            vocabulary.statistics.push({
                user: req.usuario.name,
                uid: req.usuario.id,
                numberReproductions: 1,
                numberSuccessful: 0,
                numberFailed: 0,
                numberAttempts: 0,
                average: 0
            });
        }

        const vocabularyResp = await Vocabulary.findByIdAndUpdate(id, vocabulary, { new: true });

        res.json({
            ok: true,
            msg: "audio aumentado con exito",
            vocabularyResp
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }



}

module.exports = {
    getVocabulary,
    insertVocabulary,
    deleteVocabulary,
    updateVocabulary,
    getVocabularyCategory,
    updateVocabularyCategory,
    getOrderType,
    increaseVocabularyNumberReproductions,
}