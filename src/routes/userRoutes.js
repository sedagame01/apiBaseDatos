const express= require('express')
const router = express.Router()

const { createUser, loginUser, renewToken }=require('../controllers/userControllers')

router.post('/crear', /* [validacion], */ createUser)

router.post('/', /* [validación ], */ loginUser)

router.get('/renew', /* validarJWT, */ renewToken)



module.exports=router