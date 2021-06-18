const con = require('../dbconn');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// var expressJwt = require('express-jwt');

module.exports.signUp=(req,resp)=>{
    const{username,email,password,company_id}=req.body;

    // console.log("req body",req.body)
    let hashedpwd='';
    bcrypt.hash(password, 10, function(err, hash) {
        hashedpwd=hash;
        con.query(`INSERT into user(username,password,email,company_id) VALUES("${username}",'${hashedpwd}','${email}','${company_id}')`,(err,res)=>{
            if(err) {
           return resp.json({
                error_code:err.errno,
                error_message:err.sqlMessage
            })
        }
            else{resp.json(res)}

             
        })
    });
}

module.exports.removeUser=(req,resp)=>{
    let id =req.params.id;
    con.query(`DELETE from user WHERE id='${id}'`,(err,res)=>{
            if(err)  resp.json(err);
            // console.log(res)
            else resp.json(res)
    });
}

module.exports.signIn=(req,resp)=>{

    const{username,password}=req.body
    console.log(username,password)
    con.query(`Select * FROM user WHERE username="${username}"`,(err,res)=>{
        if(err) throw err
        // console.log(res)
        if(res.length == 0){
            resp.json({
                "status":false,
                "message":"User Not Found"
            })
        }
        else
         { 
            //   console.log("signIn res",res)
            bcrypt.compare(password,res[0].password,(err,valid)=>{
                if(err) throw err
                if(valid){
                    let token=jwt.sign({id:res[0].id},"thisissecrect")
                    delete res[0].password
                    resp.json({
                        'status':true,
                        "message":"signIn resp",
                        "qrdata":res,
                        "token":token,
                        "error":""
                    })   
                }
                else
                {
                    resp.json({
                        "data":[],
                        "error":"Invalid Credentials"
                    })
                }
             })  
             
        }
    })
     
}

//protected route
module.exports.isSignedIn=(req,resp,next)=>{
    var token = req.headers.authorization;
    // console.log("issignedin",req)
    jwt.verify(token,"thisissecrect",(err,res)=>{
        if (err) {
            console.log("jwt error",err,"jwt res",res)
            return resp.json({
                "Message":"Please login"
            })
        }
    });
    next();

}  

// module.exports.isSignedIn=expressJwt({secret:"thisissecrect",userProperty:"auth",algorithms: ['HS256']})
