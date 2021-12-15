import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Redux Dispatch
import {
	setAddPage,
	setInventoryPage,
	setDefaultNavigation,
} from '../../redux/navigationSlice'
import { setDefaultMetaData } from '../../redux/inventorySlice'

// MUI
import { Box, Button, Container, Typography } from '@mui/material'

// React Components
import Category from './Category'
import Item from './Item'

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

const title = {
	fontFamily: 'Fira sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		md: '1.3rem',
		sm: '1.4rem',
		xs: '1.1rem',
	},
	mt: {
		md: '7rem',
		sm: '4rem',
		xs: '5rem',
	},
	textAlign: 'center',
	mb: '2rem',
}

const subtitle = {
	fontFamily: 'Fira sans, sans-serif',
	fontSize: {
		md: '1.3rem',
		sm: '1.4rem',
		xs: '1.1rem',
	},
	textAlign: 'center',
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
}

function Add() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { REACT_APP_DOMAIN } = process.env

	// Global state
	const { addPage } = useSelector((state) => state.navigation)
	const { categories } = useSelector((state) => state.database)
	const { selectedCategory, item, price, quantity, tags } = useSelector(
		(state) => state.addInventory
	)

	// Local State
	const [plural, setPlural] = useState('')

	// Once the data is successfullly added to the database and the user is informed of that they click the button which clears global store and changes the view to the homepage
	const pageRefresh = (bool) => {
		dispatch(setDefaultMetaData())
		dispatch(setDefaultNavigation())
		if (bool) {
			dispatch(setAddPage(''))
			dispatch(setInventoryPage('add'))
		} else history.push('/')
	}

	// On change to the global store this will pass the information along to the database
	useEffect(() => {
		// Plural check
		if (quantity > 1 || quantity === 0) {
			setPlural("'s")
		} else {
			setPlural('')
		}

		// New Category check
		if (selectedCategory[1]) {
			// Either set initial category or add a new one to the array in the database
			selectedCategory[2]
				? axios.post(
						`${REACT_APP_DOMAIN}items/categories/add`,
						{ category: categories },
						{ withCredentials: true }
				  )
				: axios.post(
						`${REACT_APP_DOMAIN}items/categories/edit`,
						{ category: categories },
						{ withCredentials: true }
				  )
		}
		if (selectedCategory[0] !== '') {
			// Add the new item associated with the new category
			axios.post(
				`${REACT_APP_DOMAIN}items/add`,
				{
					category: selectedCategory[0],
					name: item,
					cost: price,
					units: quantity,
					tags,
				},
				{ withCredentials: true }
			)
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item])

	switch (addPage) {
		default:
			return <Category />
		case 'item':
			return <Item />
		case 'addOutput':
			return (
				<Container sx={{ ...panelPosition, ...panelHeight }}>
					<Box sx={panel}>
						<Typography sx={title}>
							{quantity} {item}
							{plural} that cost {price}
							<br />
							have been added to {selectedCategory}.
						</Typography>
						<Typography sx={subtitle}>
							You can return home or add
							<br />
							another item.
						</Typography>
						<Box
							sx={{
								display: 'flex',
								width: '15rem',
								justifyContent: 'space-evenly',
								mt: '3rem',
							}}
						>
							<Button sx={submitButton} onClick={() => pageRefresh(false)}>
								Home
							</Button>
							<Button sx={submitButton} onClick={() => pageRefresh(true)}>
								Add Item
							</Button>
						</Box>
					</Box>
				</Container>
			)
	}
}

export default Add
