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
    
    const luckyNumber =Math.floor(Math.random()*100)
    res.status(200).json({msg:"hello John doe",secret:`here is your authorized data ${luckyNumber}`})
}

module.exports = {login,dashboard}