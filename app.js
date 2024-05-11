import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pkg;
 
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}
const pool = new Pool(config );

const nuevoAlumno = async (nombre, rut, curso, nivel) => {
    let text = "INSERT INTO alumnos VALUES($1, $2, $3, $4)"
    let values = [nombre, rut, curso, nivel]
    const result = await pool.query(text, values)
}

const buscarAlumno = async (rut) => {
    let text = "SELECT * FROM alumnos WHERE rut = $1"
    let values = [rut]
    const result = await pool.query(text, values)
    console.log(result.rows)
}

const alumnosRegistrados = async () => {
    let text = "SELECT * FROM alumnos"
    const result = await pool.query(text)
    console.log(result.rows)
}

const actualizarDatos = async (nombre, rut) => {
    let text = "UPDATE alumnos SET nombre = $1 WHERE rut = $2"
    let values = [nombre, rut]
    const result = await pool.query(text, values)
}

const eliminarAlumno = async (rut) => {
    let text = "DELETE from alumnos WHERE rut = $1"
    let values = [rut]
    const result = await pool.query(text, values)
}

let argumentos = process.argv.slice(2)

let comando = argumentos[0]

switch(comando) {
  case "crear":
    let nombre = argumentos[1]
    let rut = argumentos[2]
    let curso = argumentos[3]
    let nivel = argumentos[4]
    nuevoAlumno(nombre, rut, curso, nivel)
    console.log("Usuario creado con éxito");
    break;

  case "buscar":
    let rutBuscar = argumentos[1]
    buscarAlumno(rutBuscar);
    console.log("Usuario encontrado");
    break;

  case "registrados":
    alumnosRegistrados()
    break;

  case "actualizar":
    let nombreActualizado = argumentos[1]
    let rutActualizar = argumentos[2]
    actualizarDatos(nombreActualizado, rutActualizar)
    console.log("Usuario modificado con éxito");
    break;

  case "eliminar":
    let rutEliminar = argumentos[1]
    eliminarAlumno(rutEliminar)
    console.log("Usuario eliminado con éxito");
    break;

  default:
    console.log("Opción no reconocida");
}












