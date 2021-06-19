const con = require('../dbconn');


module.exports.getProject=(req,resp)=>{

  console.log('Getting Project')
    // console.log(req)
  let uid=req.params.uid;
  con.query(`SELECT * FROM project where id in(SELECT project_id FROM user_project where user_id='${uid}')`,(err,res)=>{


    if (err) console.log(err)
    
    else return resp.json(res.rows)

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

module.exports.getProjectMembers=(req,resp)=>{
  let pid=req.params.pid
  con.query(`Select id,username from public."user" where id in (Select user_id from public.user_project where project_id='${pid}')`,(err,res)=>{
    return err?console.log(err):resp.json(res.rows)
  })

}


module.exports.createProject=(req,resp)=>{
  let uid=req.params.uid
  let {pname,pdescription,pmembers}=req.body
  // console.log("members",pmembers,"proname",pname)
  console.log("Creating Project")

  con.query(`Insert into public.project(name,description,created_by) VALUES('${pname}','${pdescription}','${uid}') Returning id`,(err,res)=>{
    if(err)
    {
      return resp.json(err),console.log("First Query Error",err)
    }
    else
    { 
      console.log("First Query res",res)
      let resarray=[];

      pmembers.forEach(

        (id,index)=>{
          console.log('forEach query',id,index,pmembers.length)

          con.query(`Insert into public.user_project(user_id,project_id) VALUES('${id}','${res.rows[0].id}')`,
          (errr,ress)=>
           {
            errr?(resp.json(errr),console.log('Second Query Error',errr)):resarray.push(ress),(index==(pmembers.length-1))?resp.json(resarray):null
           }
          )
       }
      )
      
      
    }

  })


}

module.exports.getMembers=(req,resp)=>{
  uname=req.params.uname;
  console.log(uname)
  con.query(`SELECT id,username from public."user" where username LIKE '%${uname}%'`,(err,res)=>{
    err?console.log("getllUserserror",err):resp.json(res.rows)
  })

}

module.exports.deleteProject=(req,resp)=>{
  pid=req.params.pid;
  con.query(`Delete FROM project WHERE id=${pid}`,(err,res)=>{
    if(err)return console.log(err)
    else(
      resp.json(res.rows)
    )
  })


}

module.exports.updateProject=(req,resp)=>{
  pid=req.params.pid
  con.query(`UPDATE public.project SET name='${req.body.pname}',description='${req.body.pdescription}' WHERE id='${pid}'`,(err,res)=>{
    if(err)return console.log(err)
    else(
      resp.json(res.rows)
    ) 
  })
}