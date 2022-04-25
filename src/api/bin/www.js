import http from 'http'
import app from '#root/app.js'
import logger from '#config/logger.js'

if (process.env.env === 'production') {
	process.on('uncaughtException', (err) => {
		logger.info('UNCAUGHT EXCEPTION! 💥 Shutting down...')
		logger.error(err.name, err.message)
		process.exit(1)
	})
}

function normalizePort(val) {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		return val
	}

	if (port >= 0) {
		return port
	}

	return false
}
const port = normalizePort(process.env.PORT || '3000')

const server = http.createServer(app)
app.set('port', port)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}
	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

	switch (error.code) {
		case 'EACCES':
			logger.error(`${bind} requires elevated privileges`)
			process.exit(1)
		case 'EADDRINUSE':
			logger.error(`${bind} + is already in use`)
			process.exit(1)
		default:
			throw error
	}
}

function onListening() {
	const addr = server.address()
	const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`
	logger.info(`Server started on port : ${port}`)
	logger.info(`Listening on ${bind}`)
}

process.on('unhandledRejection', (err) => {
	logger.error('UNHANDLED REJECTION! 💥 Shutting down...')
	logger.error(err.name, err.message)
	server.close(() => {
		process.exit(1)
	})
})

process.on('SIGTERM', () => {
	logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully')
	server.close(() => {
		logger.info('💥 Process terminated!')
	})
})
