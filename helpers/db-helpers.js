const getAll = async(req, res = response , Objet, name) => {

    try {
        const { limit = 5, from = 0 } = req.query;
        const [total, objets] = await Promise.all([
            Objet.countDocuments(),
            Objet.find()
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.json({
            ok: true,
            total,
            name: objets
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
    getAll
}
