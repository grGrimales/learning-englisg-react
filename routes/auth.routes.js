const { Router } = require('express');
const { check } = require('express-validator');

const { login, register, renewToken } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { emailAlreadyRegistered } = require('../helpers/db-validators');
const router = Router();

router.post('/login',
    [
        check('email', 'El email es requerido').not().isEmpty(),
        check('email', 'El email no tiene una estructura correcta').isEmail(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({ min: 6 }),
    ],
    validateFields,
    login);

router.post('/register',
    [
        check('email', 'El email es requerido').not().isEmpty(),
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email no tiene una estructura correcta').isEmail(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({ min: 6 }),
        validateFields,
        check('email').custom(emailAlreadyRegistered),
        validateFields,
    ],
    register);

router.get("/renew-token",
    [
        validateJWT,
        validateFields,
    ],
    renewToken);

module.exports = router;