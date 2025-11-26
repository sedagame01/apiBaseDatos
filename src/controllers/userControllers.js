const bcrypt= require('bcryptjs')

const User = require('../models/userModel')
const {JWTGenerator}= require('../helpes/jwt')


// registrar usuarios con un puto toquen ademas 
const createUser = async (req,res)=>{

    try {
        //desestructuramos el body ( aqui le pasamos todas las cosas)  
        const {name, email, password} =req.body
        //revisamos si exite o no
        const existen = await User.findOne({email})
        if (existen){
            return res.status(400).json({
                ok:false, 
                msg:'el usuario ya existe'
            })
        }
        
        //encriptado de la contraseña
        const salt = bcrypt.genSaltSync(10);
        const nuevaContraseña = bcrypt.hashSync(password, salt);

        //creamos el usuario con la contraseña encriptada y los datos del body ya desestructurados
        const nuevoUsuario={
            name,
            email,
            password:nuevaContraseña
        }
        //guardado del nuevo usuario 
        const auxiliar = new User(nuevoUsuario)
        const usuarioGuardado= await auxiliar.save()

        //lo que le pasamos por argumento  la funcion de generar tokens 
        const payload={
            uid:usuarioGuardado._id,
            role:usuarioGuardado.role
        }
        const token = await JWTGenerator(payload)

        return res.status(201).json({
            ok:true,
            msg:'vamos avanzando',
            user:usuarioGuardado,
            token:token
        })
        
    } catch (error) {
        console.log("error desde el catch de crear")
       return  res.status(500).json({
            ok:false,
            msg:'contactar con el administrador rey'
        })  

        
    }
}


/* logear
1-revisar que este registrado
2-registrar
*/
const loginUser  = async (req ,res)=>{
    
    try {  

    const {email , password }=req.body

    const usuario = await User.findOne({email:email})

    if(!usuario){
        return  res.status(400).json({
          ok: false,
          msg: 'el usuario o la contraseña es incorrecta',
      })
    }

    const contraseñaGuardada= usuario.password

    const passwordOk = bcrypt.compareSync(password, contraseñaGuardada);

    if (passwordOk) {
        res.json({ msg: 'Login exitoso' });
    } else {
        res.status(400).json({ msg: 'Contraseña incorrecta' });
    }
 
    } catch (error) {

       return  res.status(500).json({
            ok:false,
            msg:'Error de logeo contactar con el administrador rey'
        })  
    }
}

const renewToken = async (req ,res)=>{

    try {  
        return res.status(200).json({
            ok:true,
            msg:'vamos avanzando'
        })
        
    } catch (error) {

       return  res.status(500).json({
            ok:false,
            msg:'contactar con el administrador rey'
        })
        
    }
}

module.exports= {
    createUser,
    loginUser,
    renewToken
}