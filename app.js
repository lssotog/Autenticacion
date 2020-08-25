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


//se vuelve a validar el usuario para verificar que venga la información completa
server.put ("/usuarios/:email", ValidarUsuario, (req, res, next)=>{ //cuando se hace el proceos en postman el paramentro :email no se escribe asi sino el correo del usuario
    let emailReq = req.params.email;
    if (emailReq !=req.body.email){
        res.status (409); // status 409 = conflict
        res.json({message:"El email no coincide"})
    }else {
        let usuarioEncontrado = arrayUsuario.find((user)=>{
            return user.email == emailReq;
        })
        if (usuarioEncontrado){
            let index = arrayUsuario.indexOf (usuarioEncontrado); //se busca en el array la posicion del usuario encontrado para luego actualizarlo
            //antes que responda se acualiza el usuario
            arrayUsuario[index].id = req.body.id;
            arrayUsuario[index].nombre = req.body.nombre;
            arrayUsuario[index].apellido = req.body.apellido;
            arrayUsuario[index].contrasena = req.body.contrasena
           
            res.json ({message: "Usuario actualizado satisfactoriamente"})
        } else {
            res.json ({message: "Usuario no encontrado"})
        }
    }
});



server.listen (3001, ()=>{
    console.log ("Estoy escuchando")
})