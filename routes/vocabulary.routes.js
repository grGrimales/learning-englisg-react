const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const {
    getVocabulary,
    insertVocabulary,
    deleteVocabulary,
    updateVocabulary } = require("../controllers/vocabulary.controllers");


router.get("/", [
    validateJWT,
    validateFields,
],
    getVocabulary);

router.post("/", [
    validateJWT,
    validateFields,
],

    insertVocabulary)


router.delete("/", [
    validateJWT,
    validateFields,
],
    deleteVocabulary)


router.put("/", [
    validateJWT,
    validateFields,
],
    updateVocabulary)




module.exports = router;