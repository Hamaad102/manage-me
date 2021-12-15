const Item = require('../models/Item')
const Category = require('../models/Category')
const jwt = require('jsonwebtoken')

// Get all items
module.exports.list_get = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const userId = decodedToken.id
			Item.find({ userId }).then((items) => res.json(items))
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Add item
module.exports.add_post = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const userId = decodedToken.id
			const { category, name, cost, units, tags } = req.body
			const newItem = new Item({ userId, category, name, cost, units, tags })
			newItem.save().then(() => res.status(200).send('success'))
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Edit item
module.exports.edit_post = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET,
			async (err, decodedToken) => {
				const userId = decodedToken.id
				const { itemId, category, name, cost, units, tags } = req.body
				try {
					await Item.replaceOne(
						{ _id: itemId },
						{ userId, category, name, cost, units, tags }
					)
					res.status(200).send('success')
				} catch (err) {
					res.status(400).send(err)
				}
			}
		)
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Delete item
module.exports.item_delete = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET,
			async (err, decodedToken) => {
				const { itemId } = req.body
				Item.deleteOne({ _id: itemId }, function (err) {
					if (err) return err
				})
				res.status(200).send('success')
			}
		)
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Categories

// Get Categories
module.exports.category_get = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const userId = decodedToken.id
			Category.find({ userId }).then((items) => res.json(items))
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Add Initial Category
module.exports.category_add = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			const userId = decodedToken.id
			const { category } = req.body
			const newCategory = new Category({ userId, category })
			newCategory.save().then(() => res.status(200))
		})
	} else {
		res.status(401).send('Unauthorized user')
	}
}

// Add additional categories, Remove or Edit them
module.exports.category_edit = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET,
			async (err, decodedToken) => {
				const userId = decodedToken.id
				const { category, oldCategory, newCategory } = req.body
				try {
					// This changes the array whether you add, remove or edit
					await Category.replaceOne({ userId }, { userId, category })
					// This part only triggers if you edit a category or you remove one
					// What this does is go through the items and replaces any instance of the old category with the new or sets it default which is the first category in the index
					if (newCategory) {
						Item.updateMany(
							{ userId, category: oldCategory },
							{ $set: { category: newCategory } }
						).then((item) => res.status(200).send('success'))
					} else {
						Item.updateMany(
							{ userId, category: oldCategory },
							{ $set: { category: category[0] } }
						).then((item) => res.status(200).send('success'))
					}
				} catch (err) {
					res.status(400).send(err)
				}
			}
		)
	} else {
		res.status(401).send('Unauthorized user')
	}
}
