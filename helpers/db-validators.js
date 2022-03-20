const { Vocabulary, User } = require('../models');



/**
 * Returna una exepción si no existe el vocabulary por id
 * @param {id} id del vocabulario a editar
 */
const vocabularyExistsById =  async (id) => {
    const vocabulary = await Vocabulary.findById(id);
    if ( !vocabulary ) {
        throw new Error(`No existe un Vocabulary con el id ${ id }`);
    }
}

/**
 * Devuelve una excepción si el email ya se encuentra registrado para un usuario
 * @param {*} email email a validar
 */
 const emailAlreadyRegistered = async (email = '') => {

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El  email: ${email} ya se encuentra registrado en la base de datos`);
    }
}


module.exports = {
    vocabularyExistsById,
    emailAlreadyRegistered
}