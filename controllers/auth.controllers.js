const { response } = require('express');



const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        res.json({
            ok: true,
            msg: 'successful login'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}



module.exports = {
    login,
}
