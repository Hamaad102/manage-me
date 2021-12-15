import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setShoppingCart } from '../redux/inventorySlice'
import { setDefaultMetaData } from '../redux/inventorySlice'
import { setDefaultNavigation } from '../redux/navigationSlice'

// SVG
import del from '../svg/deleteItem.svg'

// MUI
import { Box, Button, Container, Typography } from '@mui/material'

import { useEffect } from 'react'

const containerHeight = {
	height: {
		md: '80vh',
		sm: '85vh',
		xs: '86vh',
	},
}

const itemStyle = {
	width: {
		lg: '54rem',
		md: '38rem',
		xs: '100%',
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
		sm: '2.5rem',
		xs: '1.5rem',
	},
	pt: '1rem',
	pb: '2rem',
	mb: '1rem',
}

const itemTitle = {
	fontFamily: 'Lato, sans-serif',
	fontSize: {
		md: '2.063rem',
		sm: '1.75rem',
		xs: '1.5rem',
	},
}

const subTitle = {
	fontFamily: 'Fira Sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		md: '1.4rem',
		sm: '1.2rem',
		xs: '1rem',
	},
	mt: {
		sm: '1.7rem',
		xs: '1.25rem',
	},
}

const itemMeta = {
	display: 'flex',
	flexDirection: 'row',
	mt: {
		md: '1rem',
		xs: '0.75rem',
	},
}

const itemMetaSpace = {
	fontFamily: 'Fira-sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		md: '1rem',
		sm: '0.9rem',
		xs: '0.8rem',
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
		xs: '7rem',
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
		sm: '1.5rem',
		xs: '1.25rem',
	},
	width: {
		sm: '12rem',
		xs: '8rem',
	},
	p: '0.5rem',
	mt: {
		sm: 3,
		xs: 2,
	},
	mb: 2,
}

const itemMetaUnit = {
	fontFamily: 'Fira-sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		md: '1rem',
		sm: '0.9rem',
		xs: '0.8rem',
	},
}

const cursor = {
	cursor: 'pointer',
}

function Cart() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// Global State
	const { shoppingCart } = useSelector((state) => state.addInventory)

	// Local State
	const [purchase, setPurchase] = useState(false)
	const [costVal, setCostVal] = useState(0)
	const [unit, setUnit] = useState(0)

	const removeItem = (obj) => {
		let newArr = [...shoppingCart]
		newArr = newArr.filter((item) => item !== obj)
		dispatch(setShoppingCart(newArr))
	}

	const checkout = () => {
		const date = new Date().toISOString().split('T')[0]

		let data = []
		shoppingCart.forEach((item) =>
			data.push({
				itemId: item._id,
				units: item.units,
				fulfilled: true,
				name: item.name,
				cost: item.cost,
			})
		)

		axios
			.post(
				`${REACT_APP_DOMAIN}sales/sale`,
				{ item: data, date, online: false },
				{ withCredentials: true }
			)
			.then(() => {
				dispatch(setShoppingCart([]))
				setPurchase(true)
			})
	}

	useEffect(() => {
		let total = 0
		let units = 0
		shoppingCart.forEach((item) => {
			total += item.cost
			units += item.units
		})
		setCostVal(total)
		setUnit(units)
	}, [shoppingCart])

	return (
		<Container maxWidth='xl' sx={containerHeight}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					mt: {
						sm: 20,
						xs: 10,
					},
					pb: 4,
				}}
			>
				{shoppingCart.length ? (
					<>
						{shoppingCart.map((item) => (
							<Box sx={itemStyle}>
								<Box>
									<Typography sx={itemTitle}>{item.name}</Typography>
									<Box sx={itemMeta}>
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
								<Box mt={4}>
									<Box onClick={() => removeItem(item)} sx={cursor}>
										<img src={del} className='iconAlt' alt='delete icon' />
									</Box>
								</Box>
							</Box>
						))}
						<Box sx={{ ...itemStyle, justifyContent: 'space-around' }}>
							<Typography sx={{ ...itemTitle, mt: '1rem' }}>Total:</Typography>
							<Typography sx={subTitle}>
								Units:{' '}
								<Box component='span' sx={{ fontWeight: 200 }}>
									{unit}
								</Box>
							</Typography>
							<Typography sx={subTitle}>
								Cost:{' '}
								<Box component='span' sx={{ fontWeight: 200 }}>
									{costVal}
								</Box>
							</Typography>
						</Box>
						<Button type='submit' onClick={() => checkout()} sx={submitButton}>
							Checkout
						</Button>
					</>
				) : !purchase ? (
					<>
						<Typography sx={itemTitle}>Your cart is empty</Typography>
						<Button
							type='submit'
							onClick={() => history.push('/sale')}
							sx={{
								...submitButton,
								ml: 0,
								width: 'auto',
							}}
						>
							Go to Sales
						</Button>
					</>
				) : (
					<>
						<Typography sx={itemTitle}>Purhcase successful!</Typography>
						<Button
							type='submit'
							onClick={() => {
								dispatch(setDefaultNavigation())
								dispatch(setDefaultMetaData())
								history.push('/')
							}}
							sx={{
								...submitButton,
								ml: 0,
								width: 'auto',
							}}
						>
							Return to homepage
						</Button>
					</>
				)}
			</Box>
		</Container>
	)
}

export default Cart
