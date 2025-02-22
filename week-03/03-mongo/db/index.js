const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(mongo_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourses: Array
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    courseId: Number,
    title: String, 
    description: String, 
    price: Number, 
    imageLink: String,
    published: Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}