const mongoose = require('mongoose');

// Connect to MongoDB
async function connectToDB(){
    try{
        await mongoose.connect(mongo_connection_string);
        console.log('connected to db');
    }
    catch(err){
        console.log('error connecting to db');
    }
}

connectToDB();

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: Array
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
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
