let express = require ("express");
let server = express();

let arrayUsuario = [{id: "001",nombre: "Pepito", apellido: "Perez", email:"pepito@gmail.com", contrasena:"1234"}];

server.use(express.json()); 

server.get ("/usuario", (req, res, next)=>{
    res.json(arrayUsuario)
});

function ValidarUsuario (req, res, next){
    let itemId = req.body.id;
    let itemNombre = req.body.nombre;
    let itemApellido = req.body.apellido;
    let itemEmail = req.body.email;
    let itemContrasena = req.body.contrasena;
    if (itemId && itemNombre && itemApellido && itemEmail && itemContrasena ){
        next ();        
    }else {
        res.status(400); //400 = Bad Request
        res.json({message:"Por favor ingrese todos los campos"})
    }
}

server.post ("/usuario", ValidarUsuario, (req, res, next)=>{
    arrayUsuario.push(req.body)
    res.json(req.body)
});

server.put ("/usuarios/:email", (req, res, next)=>{ //cuando se hace el proceos en postman el paramentro :email no se escribe asi sino el correo del usuario
    let emailReq = req.params.email;
    let usuarioEncontrado = arrayUsuario.find((user)=>{
        return user.email == emailReq;
    })
    if (usuarioEncontrado){
        res.json ({message: "Si encontre el usuario"})
    } else {
        res.json ({message: "No encontre el usuario"})
    }
});



server.listen (3001, ()=>{
    console.log ("Estoy escuchando")
})