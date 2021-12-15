import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Redux + Action for setting id
import { useDispatch } from 'react-redux'
import { setId } from '../redux/authSlice'
import {
	setInitialCategories,
	setInitialItems,
	setSales,
} from '../redux/databaseSlice'

import { Box, Button, Container, TextField, Typography } from '@mui/material'

const panelPosition = {
	height: {
		md: '80vh',
		sm: '50rem',
		xs: '34rem',
	},
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

const panel = {
	width: '26rem',
	height: {
		md: '35.438rem',
		sm: '32rem',
		xs: '28rem',
	},
	border: '0.25rem solid #000000',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}

const title = {
	fontFamily: 'Lato, sans-serif',
	fontSize: {
		md: '2.813rem',
		sm: '2.2rem',
		xs: '1.8rem',
	},
	mt: {
		md: '5rem',
		xs: '3rem',
	},
	mb: '2rem',
}

const form = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '12rem',
}

const textField = {
	width: {
		sm: '16rem',
		xs: '12rem',
	},
	height: '3rem',
	mb: '2rem',
}

const switchView = {
	fontFamily: 'fira sans, sans-serif',
	fontSize: {
		sm: '1.1rem',
		xs: '0.9rem',
	},
	fontWeight: 300,
	width: {
		sm: '14rem',
		xs: '11.5rem',
	},
	mt: {
		md: '1rem',
		sm: '2rem',
		xs: '0.6rem',
	},
}

const switchViewSign = {
	fontFamily: 'fira sans, sans-serif',
	fontSize: {
		sm: '1.1rem',
		xs: '0.9rem',
	},
	fontWeight: 300,
	width: {
		sm: '16rem',
		xs: '13.5rem',
	},
	mt: {
		md: '1rem',
		sm: '2rem',
		xs: '0.6rem',
	},
}

const submitButton = {
	textTransform: 'none',
	fontFamily: 'Lato, sans-serif',
	border: '0.25rem solid #000000',
	color: '#000000',
	borderRadius: 0,
	textDecoration: 'none',
	'&:hover': {
		color: '#F7BD02',
		backgroundColor: '#000000',
	},
	// Specific Style
	fontSize: {
		sm: '1.15rem',
		xs: '1rem',
	},
	width: {
		sm: '7rem',
		xs: '5rem',
	},
	mt: '2rem',
}

function Auth() {
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// React Router change view
	const history = useHistory()

	// State
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const [view, setView] = useState('login')

	// Error Handler
	const error = (err) => {
		setEmailError(err.email)
		setPasswordError(err.password)
	}

	// Handle Login request
	const login = (event) => {
		event.preventDefault()
		axios
			.post(
				`${REACT_APP_DOMAIN}users/login`,
				{ email, password },
				{ withCredentials: true }
			)
			.then((res) => {
				dispatch(setId(res.data.user))

				// GET request endpoints
				const requestItems = axios.get(`${REACT_APP_DOMAIN}items/list`, {
					withCredentials: true,
				})
				const requestCategories = axios.get(
					`${REACT_APP_DOMAIN}items/categories`,
					{ withCredentials: true }
				)
				const requestSales = axios.get(`${REACT_APP_DOMAIN}sales`, {
					withCredentials: true,
				})

				axios.all([requestCategories, requestItems, requestSales]).then(
					axios.spread((...response) => {
						if (response[0].data.length !== 0) {
							dispatch(setInitialCategories(response[0].data[0].category))
							dispatch(setInitialItems(response[1].data))
							dispatch(setSales(response[2].data))
						}
						history.push('/')
					})
				)
			})
			.catch((err) => error(err.response.data.errors))
	}

	// Handle Signup request
	const signup = (event) => {
		event.preventDefault()
		axios
			.post(
				`${REACT_APP_DOMAIN}users/signup`,
				{ email, password },
				{ withCredentials: true }
			)
			.then((res) => {
				dispatch(setId(res.data.user))
				history.push('/')
			})
			.catch((err) => error(err.response.data.errors))
	}

	switch (view) {
		default:
			return (
				<Container sx={panelPosition}>
					<Box sx={panel}>
						<Typography sx={title}>Login</Typography>
						<Box component='form' onSubmit={login} autoComplete='off' sx={form}>
							{/* Email */}
							{emailError.length ? (
								<TextField
									sx={textField}
									error
									id='standard-error-helper-text'
									variant='standard'
									label='Email'
									value={email}
									onChange={(e) => {
										setEmail(e.target.value)
										setEmailError('')
									}}
									helperText={emailError}
								/>
							) : (
								<TextField
									sx={textField}
									id='standard-basic'
									variant='standard'
									label='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							)}
							{/* Password */}
							{passwordError.length ? (
								<TextField
									sx={textField}
									type='password'
									error
									id='standard-error-helper-text'
									variant='standard'
									label='Password'
									value={password}
									onChange={(e) => {
										setPassword(e.target.value)
										setPasswordError('')
									}}
									helperText={passwordError}
								/>
							) : (
								<TextField
									sx={textField}
									type='password'
									id='standard-basic'
									variant='standard'
									label='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							)}
							<Typography sx={switchView}>
								New to Manage.Me?{' '}
								<span
									className='switchTextButton'
									onClick={() => {
										setEmail('')
										setPassword('')
										setView('signup')
										setEmailError('')
										setPasswordError('')
									}}
								>
									Signup!
								</span>
							</Typography>
							<Button type='submit' sx={submitButton}>
								Login
							</Button>
						</Box>
					</Box>
				</Container>
			)
		case 'signup':
			return (
				<Container sx={panelPosition}>
					<Box sx={panel}>
						<Typography sx={title}>Signup</Typography>
						<Box
							component='form'
							onSubmit={signup}
							autoComplete='off'
							sx={form}
						>
							{/* Email */}
							{emailError.length ? (
								<TextField
									sx={textField}
									error
									id='standard-error-helper-text'
									variant='standard'
									label='Email'
									value={email}
									onChange={(e) => {
										setEmail(e.target.value)
										setEmailError('')
									}}
									helperText={emailError}
								/>
							) : (
								<TextField
									sx={textField}
									id='standard-basic'
									variant='standard'
									label='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							)}
							{/* Password */}
							{passwordError.length ? (
								<TextField
									sx={textField}
									type='password'
									error
									id='standard-error-helper-text'
									variant='standard'
									label='Password'
									value={password}
									onChange={(e) => {
										setPassword(e.target.value)
										setPasswordError('')
									}}
									helperText={passwordError}
								/>
							) : (
								<TextField
									sx={textField}
									type='password'
									id='standard-basic'
									variant='standard'
									label='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							)}
							<Typography sx={switchViewSign}>
								Already have an account?{' '}
								<span
									className='switchTextButton'
									onClick={() => {
										setEmail('')
										setPassword('')
										setView('login')
										setEmailError('')
										setPasswordError('')
									}}
								>
									Login!
								</span>
							</Typography>
							<Button type='submit' sx={submitButton}>
								Signup
							</Button>
						</Box>
					</Box>
				</Container>
			)
	}
}

export default Auth
