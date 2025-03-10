const {app,server} = require("./app.js")
const connectDB = require('./db')
require('dotenv').config()


connectDB().then(()=>{
  server.listen(process.env.PORT||3000,(err)=>{
    if(!err) console.log(`Server is running in http:localhost:${process.env.PORT || 7000}`)
    else console.log("Failed to start the server")
  })
})
