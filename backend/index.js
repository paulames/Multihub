var express = require("express");
var mysql = require('mysql');
var app = express();
var bp = require('body-parser');
const cors = require('cors');
app.use(cors());
app.options('*', cors());

app.use(bp.json({limit: '50mb'}));
app.use(bp.urlencoded({limit: '50mb', extended: true}));

var http = require('http');

const PORT = 8080;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ua'
});

connection.connect();

http.createServer(app).listen(PORT, function () {
    console.log('Servidor Multihub escuchando en el puerto %d (http://localhost:%d)', PORT, PORT);
    
});

/* ARCHIVOS */
app.get("/archivo", (req, res) => {
    connection.query(`SELECT archivos.*, categorias.nombre AS nomCategoria, usuarios.Nombre AS nomAutor, DATE_FORMAT(FechaTrabajo, '%d-%m-%Y') AS FechaTrabajo FROM archivos LEFT JOIN categorias ON archivos.Categoria = categorias.id LEFT JOIN usuarios ON archivos.Autor = usuarios.Id`, function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener los archivos" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.get("/archivo/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT archivos.*, categorias.nombre AS nomCategoria, usuarios.Nombre AS nomAutor, DATE_FORMAT(FechaTrabajo, '%d-%m-%Y') AS FechaTrabajo FROM archivos LEFT JOIN categorias ON archivos.Categoria = categorias.id LEFT JOIN usuarios ON archivos.Autor = usuarios.Id WHERE archivos.ID = ?`, [id],  function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener el archivo" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.get("/recientes", (req, res) => {
    connection.query(`SELECT archivos.*, categorias.nombre AS nomCategoria, usuarios.Nombre AS nomAutor, DATE_FORMAT(FechaTrabajo, '%d-%m-%Y') AS FechaTrabajo FROM archivos LEFT JOIN categorias ON archivos.Categoria = categorias.id LEFT JOIN usuarios ON archivos.Autor = usuarios.Id ORDER BY FechaSubida DESC LIMIT 6`, function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener los archivos" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.get("/destacados", (req, res) => {
    connection.query(`SELECT archivos.*, categorias.nombre AS nomCategoria, usuarios.Nombre AS nomAutor, DATE_FORMAT(FechaTrabajo, '%d-%m-%Y') AS FechaTrabajo FROM archivos LEFT JOIN categorias ON archivos.Categoria = categorias.id LEFT JOIN usuarios ON archivos.Autor = usuarios.Id ORDER BY archivos.Valoracion DESC LIMIT 4`, function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener los archivos" });
        } else {
            res.send({ status: 200, results});
        }
    });
})

app.get("/archivo/autor/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT archivos.*, categorias.nombre AS nomCategoria, usuarios.Nombre AS nomAutor, DATE_FORMAT(FechaTrabajo, '%d-%m-%Y') AS FechaTrabajo FROM archivos LEFT JOIN categorias ON archivos.Categoria = categorias.id LEFT JOIN usuarios ON archivos.Autor = usuarios.Id WHERE archivos.Autor = ? ORDER BY FechaSubida DESC`, [id],  function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener los archivos del autor" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.get("/archivo/categoria/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    let query;

    query = `SELECT archivos.*, categorias.nombre AS nomCategoria, usuarios.Nombre AS nomAutor, DATE_FORMAT(FechaTrabajo, '%d-%m-%Y') AS FechaTrabajo FROM archivos LEFT JOIN categorias ON archivos.Categoria = categorias.id LEFT JOIN usuarios ON archivos.Autor = usuarios.Id WHERE categorias.nombre = ?`;
    
    connection.query(query, [nombre],  function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener los archivos de la categoría" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.get("/archivo/buscar/:texto", (req, res) => {
    const texto = '%' + req.params.texto + '%';
    let query;

    query = `SELECT archivos.*, categorias.nombre AS nomCategoria, usuarios.Nombre AS nomAutor, DATE_FORMAT(FechaTrabajo, '%d-%m-%Y') AS FechaTrabajo FROM archivos LEFT JOIN categorias ON archivos.Categoria = categorias.id LEFT JOIN usuarios ON archivos.Autor = usuarios.Id WHERE LOWER(archivos.Titulo) LIKE LOWER(?) OR LOWER(usuarios.Nombre) LIKE LOWER(?) OR LOWER(archivos.Asignatura) LIKE LOWER(?) OR LOWER(archivos.Tipo) LIKE LOWER(?) OR LOWER(categorias.nombre) LIKE LOWER(?)`;

    connection.query(query, [texto, texto, texto, texto, texto], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al buscar los archivos" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.post("/archivo", (req, res) => {
    connection.query('INSERT INTO archivos SET ?', [req.body], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al registrar el archivo" });
        } else {
            res.send({ status: 200, results});
        }
    });
})

app.put("/archivo/:id", (req, res) => {
    const id = req.params.id;
    const valoracion = req.body.Valoracion;

    connection.query('SELECT COUNT(*) as count FROM archivos WHERE Id = ?', [id], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al buscar el archivo" });
        } else if (results[0].count === 0) {
            res.send({ status: 401, message: "Archivo no encontrado" });
        }else{
            if(!req.body.Valoracion){
                connection.query('UPDATE archivos SET ? WHERE Id = ?', [req.body, id], function (error, results) {
                    if (error) {
                        res.status(500).send({ status: 500, message: "Error al actualizar el archivo" });
                    } else {
                        res.send({ status: 200, results});
                    }
                });
            }else{
                connection.query(`UPDATE archivos SET Valoracion = Valoracion + ?, numValoraciones = numValoraciones + 1 WHERE ID = ?`, [valoracion, id], function (error, results) {
                    if (error) {
                        res.status(500).send({ status: 500, message: "Error al valorar el archivo" });
                    } else {
                        res.send({ status: 200, results});
                    }
                });
            }
        }
    });
});


/* USUARIOS */
app.get("/usuario", (req, res) => {
    connection.query('SELECT * FROM usuarios', function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener los usuarios" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.get("/usuario/:id", (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM usuarios WHERE Id = ?', [id], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener el usuario" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.post("/usuario/login", (req, res) => {
    const correo = req.body.Correo;
    const pwd = req.body.Contraseña;

    connection.query(`SELECT * FROM usuarios WHERE Correo = ? AND Contraseña = ?`, [correo, pwd], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error en el login" });
        } else if (results.length === 0) {
            res.send({ status: 401, message: "Credenciales incorrectas" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

app.post("/usuario", (req, res) => {
    const usuario = req.body.Correo;

    connection.query('SELECT COUNT(*) as count FROM usuarios WHERE Correo = ?', [usuario], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al buscar el correo" });
        } else if (results[0].count > 0) {
            res.send({ status: 401, message: "Correo ya registrado" });
        } else {
            connection.query('INSERT INTO usuarios SET ?', [req.body], function (error, results) {
                if (error) {
                    res.status(500).send({ status: 500, message: "Error al registrar el usuario" });
                } else {
                    res.send({ status: 200, results});
                }
            });
        }
    });
});

app.put("/usuario/:id", (req, res) => {
    const id = req.params.id;

    connection.query('SELECT COUNT(*) as count FROM usuarios WHERE Id = ?', [id], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al buscar el correo" });
        } else if (results[0].count === 0) {
            res.send({ status: 401, message: "Usuario no encontrado" });
        }else{
            connection.query('UPDATE usuarios SET ? WHERE Id = ?', [req.body, id], function (error, results) {
                if (error) {
                    res.status(500).send({ status: 500, message: "Error al actualizar el usuario" });
                } else {
                    res.send({ status: 200, results});
                }
            });
        }
    });
});


/* CATEGORIAS */
app.get("/categoria", (req, res) => {
    connection.query('SELECT * FROM categorias', function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener las categorias" });
        } else {
            res.send({ status: 200, results});
        }
    });
});


/* LIKES */
app.get("/likes", (req, res) => {
    const idArchivo = req.query.archivo;
    const idUsuario = req.query.usuario;

    if (!idArchivo && !idUsuario) {
        res.status(400).send({ status: 400, message: "Se requieren los parámetros archivo y usuario" });
        return;
    }else if(idArchivo && idUsuario){
        connection.query('SELECT COUNT(*) AS LeGusta FROM likes WHERE Usuario = ? AND Archivo = ?', [idUsuario, idArchivo], function (error, results) {
            if (error) {
                res.status(500).send({ status: 500, message: "Error al obtener la información de 'Me Gusta'" });
            } else {
                res.send({ status: 200, results});
            }
        });
    }else{
        res.status(400).send({ status: 400, message: "Se requiere el parámetro archivo" });
    }
});

app.post("/likes", (req, res) => {
    const idUsuario = req.body.Usuario;
    const idArchivo = req.body.Archivo;

    connection.query('SELECT COUNT(*) AS count FROM likes WHERE Usuario = ? AND Archivo = ?', [idUsuario, idArchivo], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al obtener la información de 'Me Gusta'" });
        } else if (results[0].count > 0) {
            res.send({ status: 401, message: "Ya le gusta la publicación" });
        } else {
            connection.query('INSERT INTO likes SET ?', [req.body], function (error, results) {
                if (error) {
                    res.status(500).send({ status: 500, message: "Error al registrar el like" });
                } else {
                    res.send({ status: 200, results});
                }
            });
        }
    });
});

app.delete("/likes", (req, res) => {
    const idUsuario = req.body.Usuario;
    const idArchivo = req.body.Archivo;

    connection.query('DELETE FROM likes WHERE Usuario = ? AND Archivo = ?', [idUsuario, idArchivo], function (error, results) {
        if (error) {
            res.status(500).send({ status: 500, message: "Error al eliminar el like" });
        } else {
            res.send({ status: 200, results});
        }
    });
});

