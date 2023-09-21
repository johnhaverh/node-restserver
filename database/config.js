const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Base de datos Online');
        

    } catch (error) {
        console.log('Error en conexión a Base de datos', error);
        //throw new Error('Error al iniciar DB');
    }

}

module.exports = {
    dbConnection
}