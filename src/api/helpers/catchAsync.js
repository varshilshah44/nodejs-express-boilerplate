import message from '#config/message.js'
import { handleError } from '#helper/responseHandler.js'
import logger from '#config/logger.js'

export default (fn) => (req, res) => {
	fn(req, res).catch((error) => {
		logger.error(`Error from catchasync : ${error}`)
		if (process.env.env === 'production') {
			return handleError({
				res,
				err: message.SOMETHING_WENT_WRONG,
				data: error
			})
		}

		return handleError({ res, err: error, data: error })
	})
}
