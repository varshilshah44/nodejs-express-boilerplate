import mongoose from 'mongoose'
import logger from '#config/logger.js'
import config from '#config/config.js'

mongoose.connect(config.db.str, config.db.options)

const db = mongoose.connection
// CONNECTION EVENTS

// When successfully connected
db.on('connected', () => {
	logger.info('Mongoose connection open to master DB')
})

// If the connection throws an error
db.on('error', (err) => {
	logger.debug(`Mongoose connection error for master DB: ${err}`)
})

// When the connection is disconnected
db.on('disconnected', () => {
	logger.debug('Mongoose connection disconnected for master DB')
})

// When connection is reconnected
db.on('reconnected', () => {
	logger.info('Mongoose connection reconnected for master DB')
})
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	db.close(() => {
		logger.debug('Mongoose connection disconnected for master DB through app termination')
		// eslint-disable-next-line no-process-exit
		process.exit(0)
	})
})

export default db
