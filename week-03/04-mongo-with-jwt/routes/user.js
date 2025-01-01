const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const { Course, User } = require("../db");
const privateKey = '123456'
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const match = await User.findOne({
        username: username
    })
    if(match){
        res.json({msg: 'User already exists'});
        return;
    }

    await User.create({
        username: username,
        password: password,
        purchasedCourses: []
    })
    res.json({message: 'User created successfully'});
});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    const username = req.body.username;
    const password = req.body.password;
    
    const match = await User.findOne({
        username,
        password
    })

    if(!match){
        res.status(401).json({msg: 'User does not exist'});
        return;
    }

    const token = jwt.sign({username: username}, privateKey);
    res.json({token: token});
    
});

router.get('/courses', userMiddleware, async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find();
    res.json({courses: allCourses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.username;

    // check if course id is correct
    let courseIdMatch;
    try{
        courseIdMatch = await Course.findById(req.params.courseId);
    }
    catch(err){
        res.json({msg: 'Course not found'})
        return;
    }
    if(!courseIdMatch){
        res.json({msg: 'Course not found'})
        return;
    }

    // find user 
    const userMatch = await User.findOne({
        username
    })
    // check if course already purchased
    if(userMatch.purchasedCourses.includes(req.params.courseId)){
        res.json({msg: 'Course already purchased'});
        return;
    }
    //updateOne, push courseId
    await User.updateOne({
        _id: userMatch._id
    }, {
        $push: {purchasedCourses: req.params.courseId}
    })

    res.json({message: 'Course purchased successfully'})

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const userMatch = await User.findOne({
        username
    })

    const purchasedCourses = await Course.find({
        _id: {$in: userMatch.purchasedCourses} // includes all values in userMatch.purchasedCourses
    })

    res.json({purchasedCourses: purchasedCourses})


});

module.exports = router