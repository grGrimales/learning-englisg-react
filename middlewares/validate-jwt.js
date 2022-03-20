const {User} = require("../models/");
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la solicitud (x-token)'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el user que corresponde al uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token invalido - (User does not exist in the database)'
            })
        }

        // Verificar si el user tiene estado true
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token invalido - (User state === false)'
            })
        }


        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token invalido'
        })
    }

}


module.exports = {
    validateJWT
}