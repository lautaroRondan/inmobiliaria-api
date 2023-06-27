const Property = require('../models/Properties');


const register = (req, res) => {
  let params = req.body;
  let propertyToSave = new Property(params);

  propertyToSave.save()
    .then(propertyStored => {
      return res.status(200).json({
        status: "success",
        message: "Se ha registrado la propiedad",
        propertyStored
      });
    })
    .catch(error => {
      return res.status(500).send({
        status: "error",
        message: "error al guardar la propiedad",
        error
      });
    });
};

// const getAllProperties = (req, res) => {
//   Property.find({})
//     .then(properties => {
//       return res.status(200).json({
//         status: "success",
//         message: "Propiedades obtenidas exitosamente",
//         properties
//       });
//     })
//     .catch(error => {
//       return res.status(500).send({
//         status: "error",
//         message: "Error al obtener las propiedades",
//         error
//       });
//     });
// };

// const searchProperties = (req, res) => {
//   const { city, operation, kindOfProperty, priceMin, priceMax } = req.body;

//   // Construimos el objeto de consulta
//   const query = {};

//   if (city) {
//     query.city = city;
//   }

//   if (operation) {
//     query.operation = operation;
//   }

//   if (kindOfProperty) {
//     query.kindOfProperty = kindOfProperty;
//   }

//   if (priceMin !== undefined && priceMax !== undefined) {
//     query.price = { $gte: priceMin, $lte: priceMax };
//   } else if (priceMin !== undefined) {
//     query.price = { $gte: priceMin };
//   } else if (priceMax !== undefined) {
//     query.price = { $lte: priceMax };
//   }

//   // Realizamos la búsqueda en la base de datos utilizando el objeto de consulta
//   Property.find(query)
//     .then(properties => {
//       return res.status(200).json({
//         status: "success",
//         message: "Propiedades obtenidas exitosamente",
//         properties
//       });
//     })
//     .catch(error => {
//       console.error('Error al realizar la búsqueda:', error);
//       return res.status(500).json({ error: 'Error al realizar la búsqueda' });
//     });
// };


const getAllProperties = (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Obtener el número de página de la consulta o establecer el valor predeterminado en 1
  const limit = 8;  // Establecer el número máximo de propiedades por página

  Property.find({})
    .skip((page - 1) * limit)  // Saltar propiedades en las páginas anteriores
    .limit(limit)  // Limitar el número de propiedades en la página actual
    .then(properties => {
      return res.status(200).json({
        status: "success",
        message: "Propiedades obtenidas exitosamente",
        properties
      });
    })
    .catch(error => {
      return res.status(500).send({
        status: "error",
        message: "Error al obtener las propiedades",
        error
      });
    });
};

const searchProperties = async (req, res) => {
  const { city, operation, kindOfProperty, priceMin, priceMax } = req.body;
  const page = parseInt(req.query.page) || 1;  // Obtener el número de página de la consulta o establecer el valor predeterminado en 1
  const limit = 8;  // Establecer el número máximo de propiedades por página

  try {
    let query = {};

    // Comprobamos si se proporcionó el parámetro de búsqueda 'city'
    if (city) {
      query.city = city;
    }

    // Comprobamos si se proporcionó el parámetro de búsqueda 'operation'
    if (operation) {
      query.operation = operation;
    }

    // Comprobamos si se proporcionó el parámetro de búsqueda 'kindOfProperty'
    if (kindOfProperty) {
      query.kindOfProperty = kindOfProperty;
    }

    // Comprobamos si se proporcionaron los parámetros de búsqueda de precio mínimo y máximo
    if (priceMin !== undefined && priceMax !== undefined) {
      // Si ambos están presentes, construimos una consulta para buscar propiedades con precio dentro del rango
      query.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin !== undefined) {
      // Si solo se proporcionó el precio mínimo, buscamos propiedades con precio mayor o igual a priceMin
      query.price = { $gte: priceMin };
    } else if (priceMax !== undefined) {
      // Si solo se proporcionó el precio máximo, buscamos propiedades con precio menor o igual a priceMax
      query.price = { $lte: priceMax };
    }

    // Realizamos la consulta a la base de datos utilizando el modelo Property y la consulta construida
    const count = await Property.countDocuments(query);  // Obtener el total de propiedades que coinciden con la consulta
    const properties = await Property.find(query)
      .skip((page - 1) * limit)  // Saltar propiedades en las páginas anteriores
      .limit(limit);  // Limitar el número de propiedades en la página actual

    return res.status(200).json({
      status: "success",
      message: "Propiedades obtenidas exitosamente",
      properties,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    return res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
};

const getPropertyById = (req, res) => {
  const id = req.params.id; // Obtener el ID de la propiedad desde los parámetros de la solicitud

  Property.findById(id)
    .then(property => {
      if (!property) {
        return res.status(404).json({
          status: "error",
          message: "Propiedad no encontrada"
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Propiedad obtenida exitosamente",
        property
      });
    })
    .catch(error => {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener la propiedad",
        error
      });
    });
};



module.exports = {
  register,
  getAllProperties,
  searchProperties,
  getPropertyById
}