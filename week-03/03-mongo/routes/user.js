const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        username: username,
        password: password,
        purchasedCourses: []
    })

    await newUser.save();

    res.json({
        message: 'User created successfully'
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const arr = await Course.find({}).lean()

    res.json({
        courses: arr
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    await User.findOneAndUpdate({
        username: req.headers['username'],
        password: req.headers['password']
    }, {
        $push: {purchasedCourses: req.params.courseId}
    });
    
    res.json({
        message: 'Course purchased successfully',
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const currentUser = await User.findOne({
        username: req.headers['username'],
        password: req.headers['password']
    })
    
    const detailedPurchasedCourses = await Course.find({
        courseId: {$in: currentUser.purchasedCourses}
    })

    res.json({
        purchasedCourses: detailedPurchasedCourses
    })
});

module.exports = router