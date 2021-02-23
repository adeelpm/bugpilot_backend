const express = require('express');
const router = express.Router();
const {getBug,createBug,changeBugStatus,getAllBug} = require('./controllers/bugController')
const {signUp,removeUser,signIn,isSignedIn} = require('./controllers/authController');
const { getProject,getMembers,createProject, getAllUsers} = require('./controllers/projectController');



//Bug Routes
router.get('/bug/:uid/:pid',isSignedIn,getBug)
router.get('/bug/:pid',isSignedIn,getBug)
router.post('/bug',isSignedIn,createBug)
router.put('/bug/:uid',isSignedIn,changeBugStatus)
router.post('/user/adduser',signUp)
router.get('/user/getmembers/:pid',getMembers)



router.get('/getproject/:uid',isSignedIn,getProject)
router.post('/createproject/:uid',isSignedIn,createProject)
router.get('/createproject/getusername/:uname',isSignedIn,getAllUsers)

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