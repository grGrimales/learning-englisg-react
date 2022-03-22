const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getVocabulary, insertVocabulary } = require("../controllers/vocabulary.controllers");


router.get("/",
    [
        validateJWT,
        validateFields,
    ],
    getVocabulary);

    router.post("/",
    [
        validateJWT,
        validateFields,
    ],
    
    insertVocabulary)



module.exports = router;