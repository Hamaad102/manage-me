import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setAddPage } from '../../redux/navigationSlice'
import { setMetaData } from '../../redux/inventorySlice'

// MUI
import { Box, Button, Container, TextField, Typography } from '@mui/material'

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

const title = {
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

function Item() {
	const dispatch = useDispatch()

	// Identifiers of product
	const [item, setItem] = useState('')
	const [price, setPrice] = useState(0.0)
	const [quantity, setQuantity] = useState(0)
	const [tags, setTags] = useState('')

	// Passes value of the metadata to the store
	const handleSubmit = (event) => {
		event.preventDefault()
		if (item !== '') {
			let tagsArr = []
			let trimTags = []
			if (tags) {
				tagsArr = tags.toLowerCase().split(',')
				tagsArr.forEach((item) => trimTags.push(item.trim()))
				trimTags = trimTags.filter((item) => item !== '')
			}
			dispatch(
				setMetaData({
					item: item.toLowerCase(),
					price,
					quantity,
					tags: trimTags,
				})
			)
			dispatch(setAddPage('addOutput'))
		}
	}

	return (
		<Container sx={{ ...panelPosition, ...containerHeight }}>
			<Box sx={panel}>
				<Typography sx={title}>
					Alright so tell me a little about this item:
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
								value={item}
								onChange={(e) => setItem(e.target.value)}
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
								value={tags}
								onChange={(e) => setTags(e.target.value)}
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
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								sx={textField}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<Typography sx={question}>How many units do you have?</Typography>
							<TextField
								id='standard-basic'
								variant='standard'
								type='number'
								label='Units'
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
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
						<Button sx={submitButton} onClick={() => dispatch(setAddPage(''))}>
							Go Back
						</Button>
						<Button
							sx={{
								...submitButton,
								ml: '1rem',
							}}
							onClick={handleSubmit}
						>
							Add Item
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}

export default Item
