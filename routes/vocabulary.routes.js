const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();



const { getVocabulary, VocabularyCRUD } = require("../controllers/vocabulary.controllers");


router.get("/",
    [
        validateJWT,
        validateFields,
    ],
    getVocabulary);

    router.post("/",
    [],
    
    VocabularyCRUD)



module.exports = router;