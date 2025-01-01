const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken');
const { Admin, Course, User } = require("../db");
const privateKey = '123456';

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const match = await Admin.findOne({
        username: username
    })
    if(match){
        res.json({msg: 'Admin already exists'});
        return;
    }

    await Admin.create({
        username: username,
        password: password
    })

    res.json({message: 'Admin created successfully'});
});

router.post('/signin', async (req, res) => {
    // Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;
    
    const match = await Admin.findOne({
        username,
        password
    })

    if(!match){
        res.status(401).json({msg: 'Admin does not exist'});
        return;
    }

    const token = jwt.sign({username: username}, privateKey);
    res.json({token: token});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCourse = await Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: true
    })  
    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find();
    res.json({courses: allCourses});
});

module.exports = router;