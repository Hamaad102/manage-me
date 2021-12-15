import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setEditPage } from '../../redux/navigationSlice'

// SVG
import edit from '../../svg/editIcon.svg'
import del from '../../svg/deleteItem.svg'

// MUI
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormGroup,
	FormControlLabel,
	Typography,
	TextField,
} from '@mui/material'

const containerHeight = {
	height: {
		md: '80vh',
		sm: '85vh',
		xs: '47rem',
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
	},
	width: '62rem',
	height: {
		md: '35.438rem',
		sm: '47rem',
		xs: '42rem',
	},
	border: '0.25rem solid #000000',
	display: 'flex',
	flexDirection: 'column',
}

const itemPosition = {
	height: 'inherit',
	display: 'flex',
	flexDirection: {
		md: 'row',
		xs: 'column',
	},
	justifyContent: {
		md: 'center',
	},
	alignItems: {
		md: 'flex-start',
		xs: 'center',
	},
	mt: {
		md: '10vh',
		xs: '5vh',
	},
}

const leftContainer = {
	width: {
		md: '22rem',
		sm: '38rem',
		xs: '20rem',
	},
}

const back = {
	cursor: 'pointer',
	mb: '1rem',
	height: '4.5rem',
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

const filterContainer = {
	border: '0.25rem solid #000000',
}

const formContainer = {
	ml: '3rem',
	mb: '1.5rem',
	mt: {
		md: '0rem',
		xs: '1rem',
	},
	display: 'flex',
	flexDirection: {
		md: 'column',
		xs: 'row',
	},
	flexWrap: 'wrap',
}

const formLabel = {
	width: {
		md: '7.5rem',
		xs: '10.5rem',
	},
}

const itemContainer = {
	display: 'flex',
	flexDirection: 'column',
}

const itemStyle = {
	ml: {
		md: '1rem',
		xs: '0rem',
	},
	mt: {
		md: '0rem',
		xs: '1rem',
	},
	width: {
		lg: '56.375rem',
		md: '42rem',
		sm: '38rem',
		xs: '20rem',
	},
	border: '0.25rem solid #000000',
	display: 'flex',
	flexDirection: {
		md: 'row',
		xs: 'column',
	},
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

const itemTitle = {
	fontFamily: 'Lato, sans-serif',
	fontSize: {
		md: '2.063rem',
		xs: '1.75rem',
	},
}

const itemMeta = {
	flexDirection: 'row',
	mt: {
		md: '1rem',
		xs: '0.75rem',
	},
	display: {
		sm: 'flex',
		xs: 'none',
	},
}

const title = {
	textAlign: 'center',
	fontFamily: 'Fira Sans, sans-serif',
	fontSize: '1.5rem',
	fontWeight: 'bold',
	mt: '1.5rem',
}

const altTitle = {
	fontFamily: 'Fira sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		md: '1.4rem',
		sm: '1.4rem',
		xs: '1.1rem',
	},
	ml: { sm: '2rem', xs: '0rem' },
	mt: {
		md: '5rem',
		sm: '4rem',
		xs: '1rem',
	},
	textAlign: {
		sm: 'left',
		xs: 'center',
	},
	mb: '2rem',
}

const questionGroup = {
	display: 'flex',
	flexDirection: {
		md: 'row',
		xs: 'column',
	},
	ml: {
		md: '0rem',
		xs: '4rem',
	},
	justifyContent: 'space-evenly',
}

const question = {
	fontFamily: 'Fira sans, sans-serif',
	fontWeight: 'bold',
}

const textField = {
	width: {
		md: '14rem',
		sm: '14rem',
		xs: '11rem',
	},
	height: '3rem',
	mb: '2rem',
	mt: '0.5rem',
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
}

const cursor = {
	cursor: 'pointer',
}

const itemMetaSpace = {
	fontFamily: 'Fira-sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		md: '1rem',
		xs: '0.9rem',
	},
	width: {
		lg: '14rem',
		md: '12rem',
		xs: '8rem',
	},
}

const cost = {
	width: {
		md: '10rem',
		sm: '8rem',
		xs: '5rem',
	},
}

const itemMetaUnit = {
	fontFamily: 'Fira-sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		md: '1rem',
		xs: '1rem',
	},
}

const itemButton = {
	display: 'flex',
	flexDirection: 'row',
	width: '7rem',
	justifyContent: 'space-between',
	mt: '2rem',
}

function Item() {
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// Global State
	const { items } = useSelector((state) => state.database)

	// Local State
	const [editItemView, setEditItemView] = useState('')
	const [metaData, setMetaData] = useState({
		itemId: '',
		category: '',
		name: '',
		cost: '',
		units: '',
		tags: '',
	})

	// Local State Filter + View
	const [filteredItem, setFilteredItem] = useState(items)
	const [filter, setFilter] = useState([])

	// Delete Request
	const handleDelete = (item) =>
		axios.post(
			`${REACT_APP_DOMAIN}items/delete`,
			{ itemId: item },
			{ withCredentials: true }
		)

	// Edit Request
	const handleEdit = (event) => {
		event.preventDefault()
		let trimTags = []
		if (metaData.tags) {
			metaData.tags.forEach((item) => trimTags.push(item.trim()))
			trimTags = trimTags.filter((item) => item !== '')
		}
		axios
			.post(
				`${REACT_APP_DOMAIN}items/edit`,
				{
					itemId: metaData.itemId,
					category: metaData.category,
					name: metaData.name,
					cost: metaData.cost,
					units: metaData.units,
					tags: trimTags,
				},
				{ withCredentials: true }
			)
			.then(() => setEditItemView(''))
	}

	const handleCheck = (event) => {
		// These two lines find the index of the object that's changing
		let index
		filter.forEach((obj) => {
			if (obj.tag === event.target.name) index = filter.indexOf(obj)
		})

		// Create a copy of the array of tags that modifies the checked
		let filterCopy = filter
		filterCopy[index] = {
			tag: event.target.name,
			checked: !filterCopy[index].checked,
		}

		// What these lines of code do is create a local array of the items the user wants to see based on their filter preference
		let filteredTags = []
		let filteredItems = []

		filterCopy.forEach((obj) => {
			if (obj.checked) filteredTags.push(obj.tag)
		})
		filteredTags.forEach((tag) => {
			items.forEach((obj) => {
				if (obj.tags.indexOf(tag) !== -1) filteredItems.push(obj)
			})
		})

		// Removes duplicate items
		filteredItems = filteredItems.filter(
			(value, index) => filteredItems.indexOf(value) === index
		)

		setFilter(filterCopy)

		// If no filters are selected display everything otherwise show what's filtered
		if (filteredItems.length === 0) setFilteredItem(items)
		else setFilteredItem(filteredItems)
	}

	useEffect(() => {
		let arr = []
		let obj = []
		items.forEach((item) => arr.push(...item.tags))

		// This line of code filters out the duplicate tags
		arr = arr.filter((value, index) => arr.indexOf(value) === index)

		arr.forEach((tag) => obj.push({ tag, checked: false }))
		setFilter(obj)
		setFilteredItem(items)
	}, [items])

	switch (editItemView) {
		default:
			return (
				<Container maxWidth='xl' sx={containerHeight}>
					<Box sx={itemPosition}>
						<Box sx={leftContainer}>
							<Box onClick={() => dispatch(setEditPage('home'))} sx={back}>
								Go Back
							</Box>
							<Box sx={filterContainer}>
								<Typography sx={title}>Filter</Typography>
								<FormGroup sx={formContainer}>
									{filter.map((obj) => (
										<FormControlLabel
											sx={formLabel}
											label={obj.tag}
											control={
												<Checkbox
													name={obj.tag}
													checked={obj.checked}
													onChange={handleCheck}
												/>
											}
										/>
									))}
								</FormGroup>
							</Box>
						</Box>
						<Box sx={itemContainer}>
							{filteredItem.map((item) => (
								<Box sx={itemStyle}>
									<Box>
										<Typography sx={itemTitle}>{item.name}</Typography>
										<Box sx={itemMeta}>
											<Box>
												<Typography sx={itemMetaSpace}>
													Category: <span className='sub'>{item.category}</span>
												</Typography>
											</Box>
											<Box>
												<Typography sx={{ ...itemMetaSpace, ...cost }}>
													Cost: <span className='sub'>${item.cost}</span>
												</Typography>
											</Box>
											<Box>
												<Typography sx={itemMetaUnit}>
													Units: <span className='sub'>{item.units}</span>
												</Typography>
											</Box>
										</Box>
									</Box>
									<Box sx={itemButton}>
										<Box
											onClick={() => {
												setEditItemView('edit')
												setMetaData({
													itemId: item._id,
													category: item.category,
													name: item.name,
													cost: item.cost,
													units: item.units,
													tags: item.tags,
												})
											}}
											sx={cursor}
										>
											<img src={edit} className='iconAlt' alt='typing icon' />
										</Box>
										<Box onClick={() => handleDelete(item._id)} sx={cursor}>
											<img src={del} className='iconAlt' alt='delete icon' />
										</Box>
									</Box>
								</Box>
							))}
						</Box>
					</Box>
				</Container>
			)
		case 'edit':
			return (
				<Container sx={{ ...panelPosition, ...containerHeight }}>
					<Box sx={panel}>
						<Typography sx={altTitle}>
							What would you like to change?
						</Typography>
						<Box component='form' autoComplete='off'>
							<Box sx={questionGroup}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Typography sx={question}>What is it called?</Typography>
									<TextField
										id='standard-basic'
										variant='standard'
										label='Name'
										value={metaData.name}
										onChange={(e) =>
											setMetaData({ ...metaData, name: e.target.value })
										}
										sx={textField}
									/>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Typography sx={{ ...question, mr: '2rem' }}>
										What makes it unique?
									</Typography>
									<TextField
										id='standard-basic'
										variant='standard'
										label='Tags (seperate w/comma)'
										value={metaData.tags}
										onChange={(e) =>
											setMetaData({ ...metaData, tags: e.target.value })
										}
										sx={textField}
									/>
								</Box>
							</Box>
							<Box sx={questionGroup}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Typography sx={question}>How much does it cost?</Typography>
									<TextField
										id='standard-basic'
										variant='standard'
										type='number'
										label='Price'
										value={metaData.cost}
										onChange={(e) =>
											setMetaData({ ...metaData, cost: e.target.value })
										}
										sx={textField}
									/>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Typography sx={question}>
										How many units do you have?
									</Typography>
									<TextField
										id='standard-basic'
										variant='standard'
										type='number'
										label='Units'
										value={metaData.units}
										onChange={(e) =>
											setMetaData({ ...metaData, units: e.target.value })
										}
										sx={textField}
									/>
								</Box>
							</Box>
							<Box
								sx={{
									mt: '2rem',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Button
									sx={submitButton}
									onClick={() => {
										setEditItemView('')
										setMetaData({
											itemId: '',
											category: metaData.category,
											name: '',
											cost: '',
											units: '',
											tags: '',
										})
									}}
								>
									Go Back
								</Button>
								<Button
									sx={{
										...submitButton,
										ml: '1rem',
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
	}
}

export default Item
