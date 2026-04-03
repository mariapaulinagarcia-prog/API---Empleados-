const express = require('express');
const app = express();

app.use(express.json());

let empleados = [];

// Crear empleado
app.post('/empleados', (req, res) => {
   const {id, nombre, cargo } = req.body;

   if (!id || !nombre || !cargo){
    return res.status(400).json({mensaje: 'Datos incompletos' });
   }

   const nuevoEmpleado = {id, nombre, cargo };
   empleados.push(nuevoEmpleado);

   console.log("Empleado guardado: ", nuevoEmpleado);

   res.json({
    mensaje: 'Empleado creado',
    empleado: nuevoEmpleado
   });
}); 

// Listar empleados
app.get ('/empleados', (req, res) => {
    res.json(empleados);
});

// Buscar empleado
app.get('/empleados/:id', (req, res) => {
    const empleado = empleados.find(e => e.id == req.params.id);
    if (!empleado) return res.status(404).json({mensaje: 'No encontrado' });
    res.json(empleado);
});

// Actualizar empleado
app.put('/empleados/:id', (req, res) => {
    const index = empleados.findIndex(e => e.id == req.params.id);
    if (index === -1) return res.status(404).json({mensaje: 'No encontrado' });

    empleados[index] = req.body;
    res.json({mensaje: 'Actualizado', empleado: empleados[index] });
});

// Eliminar empleado
app.delete('/empleados/:id', (req, res) => {
    empleados = empleados.filter(e => e.id != req.params.id);
    res.json({mensaje: 'Eliminado' });
});

app.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});
