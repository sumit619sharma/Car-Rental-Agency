const Auth = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config(); 
const secretKey = process.env.SECRET_KEY;

const  userSignUp= async ( req,res)=>{
  
    const email = req.body.email;

const user = await Auth.findOne({where: {email: email}}) || null


if(user){
    return res.status(400).send({success: false,message: "email already exist"});
}

const hashedPassword = await bcrypt.hash(req.body.password,10);
 const resp= await Auth.create({ name:req.body.name, email: email,
     password: hashedPassword, isAgent:false ,
  })

  res.send({success: true,message: "sign up success"})

}

const  carAgentSignUp= async ( req,res)=>{
    
    const email = req.body.email;
const user = await Auth.findOne({ where: { email } }) || null


if(user){
    return res.status(400).send({success: false,message: "email already exist"});
}
// hash the password
const hashedPassword = await bcrypt.hash(req.body.password,10);
 const resp= await Auth.create({ name:req.body.name, email: email,
     password: hashedPassword, isAgent:true,
  })

  res.send({success: true,message: "sign up success"})

}
const  logInUser= async ( req,res)=>{
     const email = req.body.email;
    const password = req.body.password;

let user = await Auth.findOne({where: {email}})


if(!user){
    return await res.status(404).send({success: false,message: "user not found"});
}


const isPasswordValid = await bcrypt.compare(password, user.password);
if(!isPasswordValid){
    return await res.status(401).send({success: false,message: "wrong password"})
}

res.json({success:true,message: "user logged in successfully",email: user.email,token:generateAccesstoken(user.id),isAgent: user.isAgent});
}

function generateAccesstoken(id){
    return jwt.sign({userId: id},secretKey)
}

const isAuthrorized =  async (req,res,next) =>{
  
try {
    const authToken =await req.headers.authorization;
    const decUser =  jwt.verify(authToken,secretKey);
   
    if(decUser===undefined){
        return await res.send({message:'invalid token'})
    }
    
     const user =  await Auth.findOne({where: {id: decUser.userId}})
    
   
    if(!user){
       await res.status(404).send({success: false, message: 'user Not found'})
    } else{
        req.user = user;
        next();
    }    
} catch (error) {
    res.status(404).send({success: false, message: 'user Not found'})
} 

}

const userRole = (req,res,next) => {
    const user = req.user;
    if (user.isAgent !== true) {
             return res.redirect('/');
      }

      next();
}
                    
module.exports={
    userSignUp,
    carAgentSignUp,
    logInUser,
    isAuthrorized,
    userRole ,
}