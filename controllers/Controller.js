const model= require("../Model/userModel")
const datamodel = require("../Model/dataModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const searchimage = require("../Services/fetchService")
async function Register(req , res) {
    const {name , email , password} = req.body;

    if(!name || !email || !password){
        return res.status(401).json({message:"need to fill all details"})
    }
    
    const hash = await bcrypt.hash(password , 10)


    const user = await model.create({
       name:name,
       email : email,
       password : hash
     })


     const token = jwt.sign({
        id:user._id
     } , process.env.jwt_secret)

     res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
});

     res.status(201).json({
        message:"the user is created",
        user:user
     })
    
}




async function Show(req , res) {

   const token = req.cookies.token

   console.log(token)

   try{
  jwt.verify(token , process.env.jwt_secret)
     

   const user = await model.find()

    res.status(200).json({
        user:user
    })
   }
   catch(err){
       return res.status(401).json({
        message:"you are not authorized to access this !",
        err:err
    })
   }

   
}


async function Update(req , res) {
     
    const {email , newemail} = req.body;

    const user = await model.findOne({
        email:email
    })

    if(!user){
       return res.status(301).json({
        message:"user not found"
       })
    }
     
    const updated = await model.findOneAndUpdate(
        {email : email},
        {email:newemail}
    )

    res.status(201).json({
        message:"the email is updated succesfully",
        user:updated
    })


}



async function Login(req , res) {

    const {email , password} = req.body;

    const isuser = await model.findOne({
       email:email
    })

    if(!isuser){
        return res.status(401).json({
            message:"no user found"
        })
    }
     

   const  varifying = await bcrypt.compare(password , isuser.password)

   if(!varifying){
    return res.status(401).json({
        message:"password is incorrect"
    })
   }

   const token  = jwt.sign({
    id:isuser._id
   } , process.env.jwt_secret)


  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
});

   res.status(200).json({
    message:"you are logged in",
    user:isuser,
   })



    
}



async function Search(req , res) {
      const {query , page} = req.query;
      const token = req.cookies.token;
       if(!token){
        return res.status(401).json({
            message:"you are not authorized please login"
        })
       }
      const decode = jwt.verify(token , process.env.jwt_secret)


      const user = await model.findOne({
        _id:decode.id
      })
      if(!user){
        return res.status(401).json({
            message:"tou are not authorized"
        })
      }


    
       const History = await datamodel.create({
         userId:decode.id,
         history:query
       })
       
       



      let data;
      try {
        data = await searchimage(query , page || 1);
      } catch (err) {
        console.error("Image search request failed:", err.message);
        return res.status(502).json({
          message:"image search service is unavailable"
        });
      }
   

      res.status(200).json({
        message:"data are fetched",
        image:data.results
        
      })



}


async function ShowHistory(req , res) {
     const token = req.cookies.token;
       if(!token){
        return res.status(401).json({
            message:"you are not authorized please login"
        })
       }
      const decode =  jwt.verify(token , process.env.jwt_secret)


      const data = await datamodel.find({
        userId:decode.id
      })

      

      res.status(200).json({
        message:"all the history are fetched",
        history:data
      })
}



async function getUser(req , res) {
     const token = req.cookies.token;
       if(!token){
        return res.status(401).json({
            message:"you are not authorized please login"
        })
       }
      const decode = jwt.verify(token , process.env.jwt_secret)

      console.log(decode)
      const user = await model.findOne({
        _id:decode.id
      })


      res.status(200).json({
        message:"user is fetched",
        user:user
      })
}




module.exports = {
    Register , Show , Update , Login , Search , ShowHistory , getUser
}