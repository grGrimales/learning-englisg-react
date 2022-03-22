const randomOrder = (inputArray) => {
    return inputArray.sort(() => Math.random() - 0.5);
};


/*
 *Función para ordenar el array por las palabras menos escuchadas.
 */
const orderByLeastPlayed = (inputArray) => {
    return inputArray.sort((a, b) => {
        if (a.numberReproductions > b.numberReproductions) {
            return 1;
        }
        if (a.numberReproductions < b.numberReproductions) {
            return -1;
        }
        return 0;
    });
};


/*
*Función para ordenar el array por las palabras con menos aciertos
*/
const orderByLeastHits = (inputArray) => {
    return inputArray.sort((a, b) => {
        if (a.numberSuccessful > b.numberSuccessful) {
            return 1;
        }
        if (a.numberSuccessful < b.numberSuccessful) {
            return -1;
        }
        return 0;
    });

};

module.exports = {
    randomOrder,
    orderByLeastPlayed,
    orderByLeastHits,
}
