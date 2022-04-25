import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import createHttpError from 'http-errors'
import config from '#config/config.js'
import router from '#components/index.js'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(config.apiVersionUrl, router)
app.use(mongoSanitize())
app.use(xss())
app.use(compression())

app.all('*', (req, res, next) => {
	next(new createHttpError(404, '404 Not Found'))
})

app.use((err, req, res) => {
	res.status(err.status).send(err.message)
})
export default app
