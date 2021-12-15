import { useSelector, useDispatch } from 'react-redux'

import { setInventoryPage, setEditPage } from '../../redux/navigationSlice'

// Components
import Item from './Item'
import Category from './Category'

// SVG
import typing from '../../svg/typing.svg'
import logo from '../../svg/logo.svg'

// MUI
import { Box, Container } from '@mui/material'

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

function Edit() {
	const dispatch = useDispatch()
	const { editPage } = useSelector((state) => state.navigation)

	switch (editPage) {
		default:
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
								onClick={() => dispatch(setEditPage('categories'))}
							>
								<img src={typing} className='icon' alt='typing icon' />
								Edit Categories
							</Box>
							<Box sx={panelAlt} onClick={() => dispatch(setEditPage('items'))}>
								<img src={logo} className='icon' alt='cursor icon' />
								Edit Items
							</Box>
						</Box>
					</Box>
				</Container>
			)
		case 'items':
			return <Item />
		case 'categories':
			return <Category />
	}
}

export default Edit
