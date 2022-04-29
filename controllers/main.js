const{BadRequest} = require('../errors')
const jwt =require('jsonwebtoken')

const login = async (req,res)=>{
    const {username,password} = req.body
    //username,password is not empty
    if(!username || !password)
    throw new BadRequest('Please provide Email and Password')

    const id = new Date().getDate()

    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log(username,password)
    res.status(200).json({msg:'user created',token})
}

const dashboard = async(req,res)=>{
    console.log(req.user)
    const luckyNumber =Math.floor(Math.random()*100)

    res.status(200).json({msg:`hello,${req.user.username}` ,secret:`here is your authorized data ${luckyNumber}`})
}

module.exports = {login,dashboard}