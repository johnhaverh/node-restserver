const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //rutas de la aplicación
        this.routes();
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/user'));
    }
    
    middlewares(){

        //CORS
        this.app.use(cors());
        //directorio publico
        this.app.use( express.static('public'));
    }

    listen(){
        this.app.listen (this.port, () => {
            console.log(`App listening at http://localhost: ${this.port}`);  
        })
    }
}

module.exports = Server;