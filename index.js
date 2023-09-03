// Importa y configura el paquete dotenv para cargar variables de entorno desde un archivo .env
require("dotenv").config();

// Importa el módulo Express y crea una instancia de la aplicación
const express = require("express");
const app = express();

// Configura Express para analizar solicitudes con formato JSON
app.use(express.json());

// Importa el paquete coinbase-commerce-node
var coinbase = require("coinbase-commerce-node");
var Client = coinbase.Client;
var resources = coinbase.resources;

// Inicializa el cliente de Coinbase Commerce con tu clave de API almacenada en una variable de entorno
Client.init(process.env.COINBASE_API_KEY);

// Define una ruta POST ("/checkout") para crear un cargo en Coinbase Commerce
app.post("/checkout", async (req, res) => {
  // Extrae el monto y la moneda del cuerpo de la solicitud POST
  const { amount, currency } = req.body;

  try {
    // Crea un cargo en Coinbase Commerce con los detalles proporcionados
    const charge = await resources.Charge.create({
      name: "Test Charge",
      description: "Test charge descrip",
      local_price: {
        amount: amount,
        currency: currency,
      },
      pricing_type: "fixed_price",
      metadata: {
        user_id: "3434",
      },
    });

    // Envía una respuesta exitosa con el cargo creado en formato JSON
    res.status(200).json({
      charge: charge,
    });
  } catch (error) {
    // Maneja los errores y envía una respuesta de error en caso de fallo
    res.status(500).json({
      error: error,
    });
  }
});


app.get("/", (req,res) =>{
  res.send('Hola Mundo desde el Back');
})

// Inicia el servidor Express y hace que escuche en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corre en el puerto 3000");
});
