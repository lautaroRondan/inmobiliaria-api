const mongoose = require('mongoose');

const connection = async() =>{

    try {
        await mongoose.connect("mongodb+srv://lautarorondan96:PRhvtddroqISi1Dc@cluster0.sqzz9lx.mongodb.net/inmobiliaria")

        console.log("conectado a la bd")
    } catch (error) {
        console.log(error);
        throw new Error("no se ha podido conectar a la base de datos");
    }
}
module.exports={
    connection
}