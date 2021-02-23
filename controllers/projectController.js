const con = require('../dbconn');


module.exports.getProject=(req,resp)=>{

    console.log('getting project')
  let uid=req.params.uid;
  con.query(`SELECT * FROM project where id in(SELECT project_id FROM user_project where user_id='${uid}')`,(err,res)=>{
      if (err) console.log(err)
      // console.log(res)
      resp.json(res)

  })

}

module.exports.getProjectBug =(req,resp)=>{
    
  // let uid=req.params.uid;
  // console.log("uid",uid);
  // con.query(`Select * from bug where assigned_to='${uid}'`, (err, res) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(res)
  //     resp.json(res);
  //   }
  // })

}

module.exports.getMembers=(req,resp)=>{
  let pid=req.params.pid
  con.query(`Select id,username from user where id in (Select user_id from user_project where project_id='${pid}')`,(err,res)=>{
    return err?console.log(err):resp.json(res)
  })

}


module.exports.createProject=(req,resp)=>{
  let uid=req.params.uid
  let {pname,pdescription,pmembers}=req.body
  console.log("members",pmembers,"proname",pname)

  con.query(`Insert into project(name,description,created_by) VALUES("${pname}","${pdescription}","${uid}")`,(err,res)=>{
    // return err?console.log(err):resp.json(res)
    if(err){
      return console.log("first query err",err)
    }
    else{
      console.log("first query",res.insertId)
      let resarray=[];
      pmembers.forEach((id,index)=>{
        console.log('forEach query',id,index,pmembers.length)
        con.query(`Insert into user_project(user_id,project_id) VALUES("${id}","${res.insertId}")`,(errr,ress)=>{
          errr?console.log("second query err",errr):resarray.push(ress),(index==(pmembers.length-1))?resp.json(resarray):null
          // (resarray.push(ress),console.log()
          // (index==(pmembers.length-1))?console.log("tttttrue"):null
          
        } )

      })
      
      
    }

  })


}

module.exports.getAllUsers=(req,resp)=>{
  uname=req.params.uname;
  con.query(`SELECT id,username from user where username LIKE '%${uname}%'`,(err,res)=>{
    err?console.log("getllUserserror",err):resp.json(res)
  })

}