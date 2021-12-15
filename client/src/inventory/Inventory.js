import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setInventoryPage } from '../redux/navigationSlice'
import Add from './add/Add'
import Edit from './edit/Edit'

// MUI
import { Box, Container } from '@mui/material'

// SVG
import addItem from '../svg/addItem.svg'
import editIcon from '../svg/editIcon.svg'

const containerHeight = {
	height: {
		md: '80vh',
		sm: '85vh',
		xs: '86vh',
	},
}

const panel = {
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

function Inventory() {
	const dispatch = useDispatch()

	// Local and Global State
	const { categories } = useSelector((state) => state.database)
	const { inventoryPage } = useSelector((state) => state.navigation)

	useEffect(() => {
		if (categories.length === 0) {
			dispatch(setInventoryPage('add'))
		} else dispatch(setInventoryPage('home'))
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	switch (inventoryPage) {
		default:
			return (
				<Container maxWidth='xl' sx={containerHeight}>
					<Box
						sx={{
							height: 'inherit',
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
								...panel,
								mr: {
									md: '2rem',
									xs: '0rem',
								},
								mb: {
									md: '0rem',
									xs: '2rem',
								},
							}}
							onClick={() => dispatch(setInventoryPage('add'))}
						>
							<img src={addItem} className='icon' alt='add item icon' />
							Add a new item
						</Box>
						<Box sx={panel} onClick={() => dispatch(setInventoryPage('edit'))}>
							<img src={editIcon} className='icon' alt='edit icon' />
							Edit an existing item
						</Box>
					</Box>
				</Container>
			)
		case 'add':
			return <Add />
		case 'edit':
			return <Edit />
	}
}

export default Inventory
