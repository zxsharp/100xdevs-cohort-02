const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const currentAdmin = new Admin({
        username: username,
        password: password
    })

    await currentAdmin.save();
    res.json({ message: 'Admin created successfully' });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCourse = new Course({
        courseId: ++courseId,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: true
    })
    await newCourse.save();

    res.json({
        message: 'Course created successfully', 
        courseId: courseId
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const arr = await Course.find({})

    res.json({
        courses: arr
    })
});

module.exports = router;