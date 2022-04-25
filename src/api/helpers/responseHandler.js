export class AppError extends Error {
	constructor(message, statusCode) {
		super(message)

		this.statusCode = statusCode
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
		this.isOperational = true

		Error.captureStackTrace(this, this.constructor)
	}
}

const handleResponse = ({ res, statusCode = 200, msg = 'Success', data = {}, result = 1 }) => {
	res.status(statusCode).send({ result, msg, data })
}
const handleError = ({ res, statusCode = 500, err_msg = 'Error', err = 'error', data = {}, result = 0 }) => {
	res.status(statusCode).send({
		result,
		err_msg,
		msg: err instanceof Error ? err.message : err.msg || err,
		data
	})
}

export { handleResponse, handleError }
