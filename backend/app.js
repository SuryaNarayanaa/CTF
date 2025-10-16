const express = require('express')
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const http = require('http')
const socket = require('socket.io')
const MongoDbStore = require('connect-mongodb-session')(session)
require('dotenv').config()
const { getLeaderboard } = require('./utils/leaderboardstore.js');
/** Routes imports */
const authRouter = require('./routers/authRoutes.js')
const adminRouter = require('./routers/adminRoutes.js')
const homeRouter = require('./routers/homeRoutes.js')
const userRouter = require('./routers/userRoutes.js')
const {authenticateUser,authorizeRoles} = require('./middlewares/authprovider.js')

const errorHandler = require('./middlewares/errorHandler')

const app = express()
const corsOptions = {
    origin: ['https://ctf.cseatheeye.com','https://hidden-x.onrender.com', 'https://hidden-x.vercel.app', 'http://localhost:5173','https://l14dbr7n-5173.inc1.devtunnels.ms/'], // Exact frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true // Allow cookies and credentials
  };

const store = new MongoDbStore({
    uri:process.env.MONGODB_URI,
    collection:"Sessions"
})

const sessionOptions = {
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,maxAge:1000 * 60 * 60 * 24 },
    store: store, 
}



/**middlewares setup*/
//app.use(cors(corsOprtions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(session(sessionOptions))
app.use(morgan('dev'))



/**Routes Setup */
app.use('/api/health-check',(req,res)=>{
    res.send("This is a health-check route")
})

app.use('/api/auth',authRouter)
app.use('/api/Admin',authenticateUser,authorizeRoles,adminRouter)
app.use('/api/home',authenticateUser,homeRouter)
app.use('/api/user',authenticateUser,userRouter)


app.use(errorHandler)


/**Socket setup */
const server = http.createServer(app);
const io = socket(server,{cors:corsOptions})

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
});

global.io = io;
app.use((req, res, next) => {
    req.io = global.io;
    next();
});


module.exports = {app,server}

