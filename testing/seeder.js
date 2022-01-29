const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Posts = require('../models/product')

const connectDB = require('../config/db')
const posts = require('./data/posts')


dotenv.config()
connectDB()

const importData = async () => {
    try{
        await Posts.deleteMany();
        await Posts.insertMany(posts);
        console.log("Data Imported")
        process.exit()

    }catch(err) {
        console.log(err)
        process.exit(1)
    }
}

importData()