const con = require('../dbconn');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// var expressJwt = require('express-jwt');

module.exports.signUp=(req,resp)=>{
    const {username,email,password,company_id}=req.body;
    company_id=='undefined'?company_id=0:company_id

    console.log("req body",req.body)
    let hashedpwd='';
    bcrypt.hash(password, 10, function(err, hash) {
        hashedpwd=hash;
        console.log(`INSERT into public."user"(username,password,email,company_id) VALUES('${username}','${hashedpwd}','${email}','${company_id}')`)
        con.query(`INSERT into public."user"(username,password,email,company_id) VALUES('${username}','${hashedpwd}','${email}','${company_id}')`,(err,res)=>{
            if(err) {
                console.log(err)
           return resp.json({
                error_code:err.code,
                error_message:err.sqlMessage
            })
        }
            else  {
                resp.json(res)
                // console.log(res)
            }

             
        })
    });
}

module.exports.removeUser=(req,resp)=>{
    let id =req.params.id;
    con.query(`DELETE from public."user" WHERE id='${id}'`,(err,res)=>{
            if(err)  resp.json(err);
            // console.log(res)
            else resp.json(res)
    });
}

module.exports.signIn=(req,resp)=>{

    const{username,password}=req.body
    console.log("user pass",username,password)
    console.log("query",`Select * FROM public."user" WHERE username='${username}'`)
    con.query(`Select * FROM public."user" WHERE username='${username}'`,(err,res)=>{
        if(err) console.log(err),resp.send(err)

        if(res.length == 0){
            resp.json({
                "status":false,
                "message":"User Not Found",
                "res":res
            })
        }
        else
         { 
            console.log("signIn res",password.toString(),res.rows[0].password)
            // resp.json(res.rows[0].password)
            bcrypt.compare(password.toString(),res.rows[0].password,(err,valid)=>{
                if(err) {console.log(err)}
                else if(valid){
                    let token=jwt.sign({id:res.rows[0].id},"thisissecrect")
                    delete res.rows[0].password
                    resp.json({
                        'status':true,
                        "message":"signIn resp",
                        "qrdata":res.rows[0],
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
        console.log("decoded",res)
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
