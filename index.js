const {connection} = require('./src/database/connection');
const express = require("express");
const cors = require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

 // inicializar app
console.log("proyecto arrancado");

// conectar a la base de datos
connection();

// crear servidor node
const app = express();
const puerto =  process.env.PORT ||3000;

// configurar cors
app.use(cors(corsOptions));

// convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const property_routes = require("./src/routes/RouterProperty");

app.use('/api/property', property_routes);

app.listen(puerto, ()=>{
    console.log("servidor corriendo en el puerto "+puerto);
});
