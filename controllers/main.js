const CustomAPIError = require('../errors/custom-error')
const jwt =require('jsonwebtoken')

const login = async (req,res)=>{
    const {username,password} = req.body
    //username,password is not empty
    if(!username || !password)
    throw new CustomAPIError('Please provide Email and Password',400)

    const id = new Date().getDate()

    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    console.log(username,password)


    res.status(200).json({msg:'user created',token})
}

const dashboard = async(req,res)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ') ){
        throw new CustomAPIError("No token Provided",401)
    }
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        
    res.status(200).json({msg:`hello,${decoded.username}` ,secret:`here is your authorized data ${luckyNumber}`})
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route',401)
    }


    const luckyNumber =Math.floor(Math.random()*100)
}

module.exports = {login,dashboard}