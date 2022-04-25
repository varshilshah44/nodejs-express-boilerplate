import express from 'express'

const router = express.Router()

router.use('/', (req, res) => {
	res.send('Welcome To Node.js Bolierplate')
})
export default router
