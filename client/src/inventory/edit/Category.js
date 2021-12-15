import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setEditPage } from '../../redux/navigationSlice'

// SVG
import edit from '../../svg/editIcon.svg'
import del from '../../svg/deleteItem.svg'

// MUI
import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'

const containerHeight = {
	height: {
		md: '80vh',
		sm: '85vh',
		xs: '86vh',
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

const itemStyle = {
	width: {
		lg: '54rem',
		md: '38rem',
	},
	border: '0.25rem solid #000000',
	display: 'flex',
	flexDirection: 'row',
	alignItems: {
		md: 'flex-start',
		xs: 'center',
	},
	justifyContent: 'space-between',
	px: {
		md: '3rem',
		xs: '2.5rem',
	},
	pt: '1rem',
	pb: '2rem',
	mb: '1rem',
}

const itemButton = {
	display: 'flex',
	flexDirection: 'row',
	width: '7rem',
	justifyContent: 'space-between',
	mt: '2rem',
}

const title = {
	fontFamily: 'Fira Sans, sans-serif',
	fontSize: '1.5rem',
	fontWeight: 'bold',
	mt: '1.5rem',
}

const titleAlt = {
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

const cursor = {
	cursor: 'pointer',
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

const panelAlt = {
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

const form = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '12rem',
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

const textField = {
	width: {
		md: '14rem',
		sm: '12rem',
		xs: '11rem',
	},
	height: '3rem',
	mb: '2rem',
}

function Category() {
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// Global State
	const { categories } = useSelector((state) => state.database)

	// Local State
	const [editCategoryView, setEditCategoryView] = useState('')
	const [oldCategory, setOldCategory] = useState('')
	const [newCategory, setNewCategory] = useState('')

	// Local State. This array holds the categories minus the one the user is trying to delete
	const [deleteArr, setDeleteArr] = useState('')

	const handleEdit = (event) => {
		event.preventDefault()
		let tempArr = []
		tempArr.push(...categories.filter((item) => item !== oldCategory))
		tempArr.push(newCategory)
		axios
			.post(
				`${REACT_APP_DOMAIN}items/categories/edit`,
				{ category: tempArr, oldCategory, newCategory },
				{ withCredentials: true }
			)
			.then(() => {
				setEditCategoryView('')
				setOldCategory('')
				setNewCategory('')
			})
	}

	const handleDelete = (event) => {
		event.preventDefault()
		let tempArr = []
		tempArr.push(...categories.filter((item) => item !== oldCategory))
		axios
			.post(
				`${REACT_APP_DOMAIN}items/categories/edit`,
				{ category: tempArr, oldCategory, newCategory },
				{ withCredentials: true }
			)
			.then(() => {
				setEditCategoryView('')
				setOldCategory('')
				setNewCategory('')
				setDeleteArr('')
			})
	}

	// The delete button should not be visible if there is less than one category remaining, there must always be at least one category
	const visible = { display: categories.length > 1 ? 'inline-block' : 'none' }

	switch (editCategoryView) {
		default:
			return (
				<Container maxWidth='xl' sx={containerHeight}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: {
								md: 'center',
							},
							mt: 10,
							pb: 4,
						}}
					>
						<Box onClick={() => dispatch(setEditPage('home'))} sx={back}>
							Go Back
						</Box>
						{categories.length ? (
							categories.map((val) => (
								<Box sx={itemStyle}>
									<Typography sx={title}>{val}</Typography>
									<Box sx={itemButton}>
										<Box
											onClick={() => {
												setEditCategoryView('edit')
												setOldCategory(val)
												setNewCategory(val)
											}}
											sx={cursor}
										>
											<img src={edit} className='iconAlt' alt='typing icon' />
										</Box>
										<Box
											onClick={() => {
												setEditCategoryView('delete')
												setOldCategory(val)
												setDeleteArr(categories.filter((item) => item !== val))
											}}
											sx={{ ...cursor, ...visible }}
										>
											<img src={del} className='iconAlt' alt='delete icon' />
										</Box>
									</Box>
								</Box>
							))
						) : (
							<h1>No Categories</h1>
						)}
					</Box>
				</Container>
			)
		case 'edit':
			return (
				<Container sx={{ ...panelPosition, ...panelHeight }}>
					<Box sx={panelAlt}>
						<Typography sx={titleAlt}>
							What would you like to call this category?
						</Typography>
						<Box component='form' autoComplete='off' sx={form}>
							<TextField
								sx={textField}
								id='standard-basic'
								variant='standard'
								label='Category'
								value={newCategory}
								onChange={(e) => setNewCategory(e.target.value)}
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
										setEditCategoryView('')
										setOldCategory('')
										setNewCategory('')
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
									onClick={handleEdit}
								>
									Save
								</Button>
							</Box>
						</Box>
					</Box>
				</Container>
			)
		case 'delete':
			return (
				<Container sx={{ ...panelPosition, ...panelHeight }}>
					<Box sx={panelAlt}>
						<Typography sx={titleAlt}>
							Which category should take it's place?
						</Typography>
						<Box component='form' autoComplete='off' sx={form}>
							<FormControl
								variant='standard'
								sx={{ m: 1, width: '10rem', mt: '1rem', mb: '4rem' }}
							>
								<InputLabel>Category</InputLabel>
								<Select
									value={newCategory}
									onChange={(e) => setNewCategory(e.target.value)}
									label='Category'
									required
								>
									<MenuItem value=''>
										<em>-- Select a Category --</em>
									</MenuItem>
									{deleteArr.map((x) => (
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
										setEditCategoryView('')
										setOldCategory('')
										setNewCategory('')
									}}
								>
									Go Back
								</Button>
								<Button type='submit' sx={submitButton} onClick={handleDelete}>
									Continue
								</Button>
							</Box>
						</Box>
					</Box>
				</Container>
			)
	}
}

export default Category
