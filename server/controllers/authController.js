const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
	console.log(err.message, err.code)
	let errors = { email: '', password: '' }

	// dupliate error
	if (err.code === 11000) {
		errors.email = 'This email is already in use.'
		return errors
	}

	// validation error
	if (err.message.includes('users validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message
		})
	}

	// incorrect email
	if (err.message === 'incorrect email') {
		errors.email = 'that email is not registered'
	}

	// incorrect password
	if (err.message === 'incorrect password') {
		errors.password = 'that password is incorrect'
	}

	return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: maxAge,
	})
}

module.exports.signup_post = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.create({ email, password })
		const token = createToken(user._id)
		res
			.status(201)
			.cookie('jwt', token, {
				httpOnly: true,
				maxAge: maxAge * 1000,
				secure: true,
				sameSite: 'None',
			})
			.json({ user: user._id })
	} catch (err) {
		const errors = handleErrors(err)
		res.status(400).json({ errors })
	}
}

// Logout
// We can accomplish this by erasing the JWT on the client side, however this isn't the best method because the jwt is still stored on the server which can be a potential entry point
// Redis is apparently an option that creates a DB blacklist for tokens that have are no longer active but not expried
module.exports.logout_get = (req, res) => {
	res
		.status(200)
		.cookie('jwt', '', { maxAge: 1, secure: true, sameSite: 'None' })
		.send('')
}

// Login
module.exports.login_post = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.login(email, password)
		const token = createToken(user._id)
		res
			.status(200)
			.cookie('jwt', token, {
				httpOnly: true,
				maxAge: maxAge * 1000,
				secure: true,
				sameSite: 'None',
			})
			.json({ user: user._id })
	} catch (err) {
		const errors = handleErrors(err)
		res.status(400).json({ errors })
	}
}

// Verify User
module.exports.verify_get = (req, res) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			if (err) {
				res.send(err.message)
			} else {
				res.send(decodedToken.id)
			}
		})
	} else {
		res.send('')
	}
}
