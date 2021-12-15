import { useSelector, useDispatch } from 'react-redux'
import {
	setInventoryPage,
	setAddPage,
	setCategoryPage,
} from '../../redux/navigationSlice'
import { setSelectedCategory } from '../../redux/inventorySlice'
import { setCategories } from '../../redux/databaseSlice'

import React, { useEffect, useState } from 'react'

// MUI
import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material'

// SVG
import typing from '../../svg/typing.svg'
import cursor from '../../svg/cursor.svg'

const containerHeight = {
	height: {
		md: '80vh',
		sm: '85vh',
		xs: '86vh',
	},
}

const panelHeight = {
	height: {
		md: '80vh',
		sm: '50rem',
		xs: '34rem',
	},
}

const panelPosition = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

const panel = {
	mt: {
		sm: '0rem',
		xs: '5rem',
	},
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

const panelAlt = {
	cursor: 'pointer',
	width: {
		lg: '26rem',
		md: '18rem',
	},
	height: {
		lg: '35.438rem',
		md: '30rem',
		sm: '15rem',
		xs: '12rem',
	},
	textTransform: 'none',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	fontFamily: 'Fira sans, sans serif',
	fontWeight: 300,
	fontSize: {
		lg: '1.5rem',
		md: '1.2rem',
	},
	color: '#000000',
	border: '0.25rem solid #000000',
	borderRadius: 0,
	'&:hover': {
		backgroundColor: 'hsl(46, 98%, 55%)',
	},
}

const back = {
	cursor: 'pointer',
	mb: '1rem',
	width: {
		lg: '54rem',
		md: '38rem',
	},
	height: '6rem',
	textTransform: 'none',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	fontFamily: 'Fira sans, sans serif',
	fontWeight: 'bold',
	fontSize: {
		sm: '1.5rem',
		xs: '1.2rem',
	},
	color: '#000000',
	border: '0.25rem solid #000000',
	borderRadius: 0,
	'&:hover': {
		backgroundColor: 'hsl(46, 98%, 55%)',
	},
}

const title = {
	fontFamily: 'Fira sans, sans-serif',
	fontWeight: 300,
	textAlign: 'center',
	fontSize: {
		md: '1.1rem',
		sm: '1rem',
		xs: '0.9rem',
	},
	mt: {
		md: '7rem',
		xs: '5rem',
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
		md: '14rem',
		sm: '12rem',
		xs: '11rem',
	},
	height: '3rem',
	mb: '2rem',
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
		md: '1.15rem',
		sm: '1rem',
		xs: '0.9rem',
	},
	p: '0.5rem',
	mt: '2rem',
}

function Category() {
	const dispatch = useDispatch()

	// Page Handler
	const { categoryPage } = useSelector((state) => state.navigation)

	// Local and Global State
	const { categories } = useSelector((state) => state.database)
	const { selectedCategory } = useSelector((state) => state.addInventory)

	// The values represent category, new category and new user
	const [category, setCategory] = useState(['', null, null])

	// Triggers on page load. If the user is new they are automatically asked to create a new category whereas an old user will be able to choose if they want to create a new category or use an old one.
	useEffect(() => {
		if (categories.length === 0) {
			dispatch(setCategoryPage('addCategory'))
		} else {
			dispatch(setCategoryPage('home'))
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Triggers only if the user returns to this component from the Add component. This repopulates local state (category) with the info from the global state.
	useEffect(() => {
		if (selectedCategory[0]) {
			if (selectedCategory[1]) {
				dispatch(setCategoryPage('addCategory'))
			} else {
				dispatch(setCategoryPage('selectCategory'))
			}
		}
		setCategory(selectedCategory)
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory])

	const handleSubmit = (event) => {
		event.preventDefault()
		const lowercase = [category[0].toLowerCase(), category[1], category[2]]
		if (lowercase[1]) dispatch(setCategories(lowercase[0]))
		dispatch(setSelectedCategory(lowercase))
		dispatch(setAddPage('item'))
	}

	switch (categoryPage) {
		// If the user has a category this is page that will be brought up once the component is mounted
		case 'home':
			return (
				<Container maxWidth='xl' sx={containerHeight}>
					<Box
						sx={{
							height: 'inherit',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: {
								md: 'center',
							},
						}}
					>
						<Box onClick={() => dispatch(setInventoryPage('home'))} sx={back}>
							Go Back
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: {
									md: 'row',
									xs: 'column',
								},
								alignItems: {
									md: 'center',
								},
								justifyContent: 'center',
							}}
						>
							<Box
								sx={{
									...panelAlt,
									mr: {
										md: '2rem',
										xs: '0rem',
									},
									mb: {
										md: '0rem',
										xs: '2rem',
									},
								}}
								onClick={() => dispatch(setCategoryPage('addCategory'))}
							>
								<img src={typing} className='icon' alt='typing icon' />
								New Category
							</Box>
							<Box
								sx={panelAlt}
								onClick={() => dispatch(setCategoryPage('selectCategory'))}
							>
								<img src={cursor} className='icon' alt='cursor icon' />
								Existing one
							</Box>
						</Box>
					</Box>
				</Container>
			)
		case 'addCategory':
			return (
				<>
					{categories.length ? (
						<Container sx={{ ...panelPosition, ...panelHeight }}>
							<Box sx={panel}>
								<Typography sx={title}>
									Alright, so what's the name of this
									<br />
									new category?
								</Typography>
								<Box component='form' autoComplete='off' sx={form}>
									<TextField
										sx={textField}
										id='standard-basic'
										variant='standard'
										label='Category'
										value={category[0]}
										onChange={(e) => setCategory([e.target.value, true, false])}
									/>
									<Box
										sx={{
											display: 'flex',
											width: '15rem',
											justifyContent: 'space-evenly',
										}}
									>
										<Button
											type='submit'
											sx={submitButton}
											onClick={() => {
												dispatch(setCategoryPage('home'))
												dispatch(setSelectedCategory(['', null, false]))
												setCategory(['', null, false])
											}}
										>
											Go Back
										</Button>
										<Button
											type='submit'
											sx={{
												...submitButton,
												width: {
													md: '6rem',
													sm: '5rem',
													xs: '4rem',
												},
											}}
											onClick={handleSubmit}
										>
											Next
										</Button>
									</Box>
								</Box>
							</Box>
						</Container>
					) : (
						<Container sx={{ ...panelPosition, ...panelHeight }}>
							<Box sx={panel}>
								<Typography sx={title}>
									Let's get started with your first category!
									<br /> What kinda item do you want to log?
								</Typography>
								<Box
									component='form'
									onSubmit={handleSubmit}
									autoComplete='off'
									sx={form}
								>
									<TextField
										sx={textField}
										id='standard-basic'
										variant='standard'
										label='Category'
										value={category[0]}
										onChange={(e) => setCategory([e.target.value, true, true])}
									/>
									<Button type='submit' sx={submitButton}>
										Add Category
									</Button>
								</Box>
							</Box>
						</Container>
					)}
				</>
			)

		case 'selectCategory':
			return (
				<Container sx={{ ...panelPosition, ...panelHeight }}>
					<Box sx={panel}>
						<Typography sx={title}>
							Select from one of the following:
						</Typography>
						<Box component='form' autoComplete='off' sx={form}>
							<FormControl
								variant='standard'
								sx={{ m: 1, width: '10rem', mt: '1rem', mb: '4rem' }}
							>
								<InputLabel>Category</InputLabel>
								<Select
									value={category[0]}
									onChange={(e) => setCategory([e.target.value, false, false])}
									label='Category'
									required
								>
									<MenuItem value=''>
										<em>-- Select a Category --</em>
									</MenuItem>
									{categories.map((x) => (
										<MenuItem value={x}>{x}</MenuItem>
									))}
								</Select>
							</FormControl>
							<Box
								sx={{
									display: 'flex',
									width: '15rem',
									justifyContent: 'space-evenly',
								}}
							>
								<Button
									type='submit'
									sx={submitButton}
									onClick={() => {
										dispatch(setCategoryPage('home'))
										dispatch(setSelectedCategory(['', null, false]))
										setCategory(['', null, false])
									}}
								>
									Go Back
								</Button>
								<Button type='submit' sx={submitButton} onClick={handleSubmit}>
									Continue
								</Button>
							</Box>
						</Box>
					</Box>
				</Container>
			)
		default:
			return <div className='loading'></div>
	}
}

export default Category
