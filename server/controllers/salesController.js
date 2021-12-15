const Sales = require('../models/Sales')
const Item = require('../models/Item')
const jwt = require('jsonwebtoken')

// Sales

// Get list of items sold
module.exports.sales_get = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const userId = decodedToken.id
			Sales.find({ userId }).then((items) => res.json(items))
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Post New Sale
module.exports.sales_post = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const userId = decodedToken.id
			const { item, date, online } = req.body

			item.forEach((item) => {
				// Looks through invetory and udpates stock to reflect units sold
				Item.findById(item.itemId, async (err, doc) => {
					doc.units = doc.units - item.units
					await doc.save()
				})
			})

			const newSale = new Sales({ userId, item: item, date, online })
			newSale.save()

			res.status(200).send('success')
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Fulfill online sale
module.exports.fulfill_post = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const { _id, item } = req.body

			item.forEach((item) => {
				// Looks through invetory and udpates stock to reflect units sold
				Item.findById(item.itemId, async (err, doc) => {
					doc.units = doc.units - item.units
					await doc.save()
				})
			})

			Sales.findOne({ _id }, async (err, doc) => {
				doc.item = item
				await doc.save()
			})

			res.status(200).send('success')
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Refund sale
module.exports.refund_post = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const { _id, itemArr, item } = req.body

			Item.findOne({ _id: item.itemId }, async (err, doc) => {
				doc.units = doc.units + item.units
				await doc.save()
			})
			Sales.findOne({ _id }, async (err, doc) => {
				doc.item = itemArr
				await doc.save()
			})

			res.status(200).send('Success')
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Refund sale and remove document that is empty
module.exports.refund_delete = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const { _id, itemArr, item } = req.body

			Item.findOne({ _id: item.itemId }, async (err, doc) => {
				doc.units = doc.units + item.units
				await doc.save()
			})

			Sales.deleteOne({ _id }, function (err) {
				if (err) return handleError(err)
			})

			res.status(200).send('Success')
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}
