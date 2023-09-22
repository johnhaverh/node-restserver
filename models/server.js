const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config'); 

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        //Conexion DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //rutas de la aplicación
        this.routes();
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    async conectarDB(){
        await dbConnection();
    }

    
    middlewares(){

        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

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