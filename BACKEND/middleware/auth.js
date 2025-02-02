const jwt = require('jsonwebtoken')

const authMiddleware = async(req, res, next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:'No Authorization LogIn Again' })
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRETE)
        req.body.userId = token_decode.id
        next()
    }catch(err){
        console.log(err)
        res.json({success:false, message:'Internal Server Error'})

    }
}


module.exports = authMiddleware