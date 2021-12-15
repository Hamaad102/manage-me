const express = require('express')

// NOT NEEDED FOR FINAL PRODUCT START
// const path = require('path')
// const https = require('https')
// const fs = require('fs')
// END

const { createServer } = require('http')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

// routes
const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')
const salesRoutes = require('./routes/salesRoutes')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// For Websocket you need to intialize server as opposed to relying on express for that
// const server = https.createServer(
// 	{
// 		key: fs.readFileSync(path.resolve('cert/server.key')),
// 		cert: fs.readFileSync(path.resolve('cert/server.crt')),
// 	},
// 	app
// )

const server = createServer(app)
const io = require('socket.io')(server, {
	cors: {
		origin: [
			'http://localhost:3000',
			'https://elastic-albattani-69ef0f.netlify.app',
		],
		methods: ['GET'],
		credentials: true,
	},
})

// middleware
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'https://elastic-albattani-69ef0f.netlify.app',
		],
		optionsSuccessStatus: 200,
	})
)
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})

const connection = mongoose.connection

// Triggers once connected
connection.once('open', () => {
	console.log('MongoDB database connected')

	// Monitor changes to database
	const itemsCollection = connection.collection('items').watch()
	const categoriesCollection = connection.collection('categories').watch()
	const salesCollection = connection.collection('sales').watch()

	itemsCollection.on('change', (change) => {
		io.emit('updateItems', change)
	})

	categoriesCollection.on('change', (change) => {
		io.emit('updateCategories', change)
	})

	salesCollection.on('change', (change) => {
		io.emit('updateSales', change)
	})
})

app.use('/users', authRoutes)
app.use('/items', itemRoutes)
app.use('/sales', salesRoutes)

server.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})
