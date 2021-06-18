const express = require('express');
const router = express.Router();
const {getBug,createBug,changeBugStatus,getAllBug,updateBug,deleteBug} = require('./controllers/bugController')
const {signUp,removeUser,signIn,isSignedIn} = require('./controllers/authController');
const { getProject,getMembers,createProject, getProjectMembers,deleteProject,updateProject} = require('./controllers/projectController');



//Bug Routes
router.get('/bug/:uid/:pid',isSignedIn,getBug)
router.get('/bug/:pid',isSignedIn,getBug)
router.post('/bug',isSignedIn,createBug)
router.put('/bug/:bid',isSignedIn,changeBugStatus)
router.put('/bug/update/:bid',isSignedIn,updateBug)
router.delete('/bug/delete/:bid',isSignedIn,deleteBug)
router.post('/user/adduser',signUp)
router.get('/user/getmembers/:pid',getMembers)



router.get('/project/:uid',isSignedIn,getProject)
router.post('/project/:uid',isSignedIn,createProject)
router.get('/project/projectmembers/:uname',isSignedIn,getProjectMembers)
router.put('/project/edit/:pid',isSignedIn,updateProject)
router.delete('/project/:pid',isSignedIn,deleteProject)

router.get('/testroute',isSignedIn,(req,res)=>{
    res.json({
       "message":"works"
    })
})









//auth routes

router.post('/signup',signUp)
router.delete('/removeuser/:id',removeUser)
router.post('/signin/',signIn)



module.exports = router