import dotenv from 'dotenv'

dotenv.config()

export default {
	apiVersionUrl: '/api/v1',
	db: {
		str: process.env.NODE_ENV === 'production' ? process.env.PROD_MONGO_STRING : process.env.DEV_MONGO_STRING,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	}
}
