const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    cpassword:{
        type:String,
        require:true,
    },
})

const LogInCollection=new mongoose.model('details',logInSchema)

module.exports=LogInCollection
