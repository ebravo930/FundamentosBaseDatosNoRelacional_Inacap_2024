### Docker
1. Descargar imagen MongoDb
    docker pull mongo
2. Arrancar imagen
    docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo

### Node 
1. Creamos carpeta
    mkdir node-crud-app
    cd node-crud-app
2. Inicializa un nuevo proyecto Node.js.
    npm init -y
3. Instala las dependencias necesarias.
    npm install express mongoose multer body-parser
4. Estructura del proyecto
    node-crud-app/
    ├── models/
    │   └── item.js
    ├── routes/
    │   └── items.js
    ├── public/
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── uploads/
    ├── .gitignore
    ├── app.js
    └── package.json
5. Ejecutar proyecto
    node app.js

