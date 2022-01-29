const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();

dotenv.config()

app.use(express.json());

//Import Routes
const productsRoute = require('./Routes/products');
const ordersRoute = require('./Routes/orders');
const userRoute = require('./Routes/userRoutes')

// Handling CORS errors
app.use(cors({ credentials: true, origin: true}))

//made upload available publicly and parse requests at upload route
app.use('/uploads',express.static('uploads'))

//Routes
app.get('/', (req,res)=>{
    res.send('E-Commerce');
});

app.use('/products',productsRoute);
app.use('/orders',ordersRoute);
app.use('/users', userRoute)

//404 error middleware
app.use((req,res) => {
    res.status(404).json({message : "Page Not Found"})
})


const PORT = 3000

const startServer = async (PORT) => {
    await connectDB()

    console.log(PORT, ()=> console.log(`Server started on http://localhost:${PORT}`))
}

startServer(PORT)
app.listen(PORT);