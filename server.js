/* eslint-disable multiline-comment-style */
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')

const Keys = require('./keys')

const dev = Keys.ENVIRON !== 'PROD'
const app = next({ dev })
const routes = require('./routes')
const handle = routes.getRequestHandler(app)

const apiRoutes = require('./api/routes')
const User = require('./api/models/User')


app
  .prepare()
  .then(async () => {
    const server = express()

    // Allows for cross origin domain request:
    server.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })

    // MongoDB Connection Setup
    mongoose.Promise = global.Promise

    // Configure MongoDB connection options for Azure Cosmos DB
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      retryWrites: false,
      // Connection settings
      maxPoolSize: 1,
      // Timeouts
      connectTimeoutMS: 30000,
      socketTimeoutMS: 360000,  // 6 minutes
      // Keep-alive settings
      keepAlive: true,
      keepAliveInitialDelay: 300000
    }

    try {
      await mongoose.connect(Keys.MONGODB_URI, mongoOptions)
      console.log('MongoDB connected successfully')

      // Check for existing users and create default if none exist
      const userCount = await User.countDocuments()
      if (userCount === 0) {
        console.log('No users found. Creating default user...')
        try {
          await User.register(new User({ username: 'helhimush20' }), 'helhimush20!')
          console.log('Default user created successfully')
        } catch (userErr) {
          console.error('Error creating default user:', userErr)
        }
      } else {
        console.log('Existing users found:', userCount)
      }
    } catch (err) {
      console.error('MongoDB connection error:', err)
      process.exit(1)
    }
    
    const db = mongoose.connection
    db.on('error', err => {
      console.error('MongoDB error:', err)
    })
    db.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

    // Parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }))
    // Parse application/json
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    // Parse cookies
    server.use(cookieParser())
    // Sessions
    server.use(
      session({
        secret: Keys.SESSION_SECRET,
        resave: true,
        saveUninitialized: false
      })
    )

    // Passport
    passport.use(User.createStrategy())
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
    server.use(passport.initialize())
    server.use(passport.session())

    let io
    server.use(function(req, res, next) {
      res.io = io
      next()
    })

    // API routes
    server.use('/api/v1', apiRoutes)

    // Next.js routes
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const finalServer = server.listen(Keys.PORT, err => {
      if (err) throw err
      // eslint-disable-next-line
      console.log('> Ready on http://localhost:' + Keys.PORT)
    })

    // Socket.io
    io = socketIo.listen(finalServer)
  })
  .catch(ex => {
    // eslint-disable-next-line
    console.error(ex.stack)
    process.exit(1)
  })
