const path = require('path');
const {v4: uuidv4} = require('uuid');

const subirArchivo = (files, extensiones = ['jpg','png','gif','jpeg'], carpeta='') => {

    return new Promise((resolve, relect) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1];
    
        if (!extensiones.includes(extension)){
            return reject (`Solo se permiten estas extensiones de archivo ${extensiones}`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        // const uploadPath = path.join(__dirname, '../uploads/', archivo.name);
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
             reject( err );
          }
          resolve (nombreTemp );
        });
    }) 

}


module.exports = {
    subirArchivo
}