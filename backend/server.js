const app=require('./app')
const dotenv=require('dotenv')
const cloudinary=require('cloudinary')
const connectDatabase=require('./config/database')
//Handling the uncaugth exceptions
process.on('uncaughtException',err=>{
    console.log(`ERROR:${err.message}`)
    console.log('shutting down the server due to uncaught exception')
    process.exit(1)
})
//setting up config file
dotenv.config({path:'backend/config/config.env'})
//if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// Setting up cloudinary configuration
//console.log(a)
//connecting to database
connectDatabase()
// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
 const server=app.listen(process.env.PORT,()=>{
    console.log(`server is listrening on PORT :${process.env.PORT} in ${process.env.NODE_ENV} mode .`)
})
//handle unhandled Promise rejections 
process.on('unhandledRejection',err=>{
    console.log(`ERROR:${err.message}`)
    console.log('shutting down the server due to unhandled Promise Rejection')
    server.close(()=>{
process.exit(1)
    })
})