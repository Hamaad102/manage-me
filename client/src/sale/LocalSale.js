import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSalesPage } from '../redux/navigationSlice'
import { setShoppingCart } from '../redux/inventorySlice'

// MUI
import { Box, Button, Container, TextField, Typography } from '@mui/material'

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
	py: 3,
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
	alignItems: 'flex-start',
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
		xs: '1.75rem',
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
		xs: '0.9rem',
	},
}

const form = {
	width: '12rem',
	display: 'flex',
	flexDirection: 'column',
}

const textField = {
	width: {
		md: '14rem',
		sm: '12rem',
		xs: '11rem',
	},
	height: '3rem',
	mb: '2rem',
	ml: {
		sm: '3rem',
		xs: '1.5rem',
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
		md: '1.15rem',
		xs: '1rem',
	},
	width: {
		sm: '12rem',
		xs: '8rem',
	},
	p: '0.5rem',
	mt: {
		sm: 4,
		xs: 2,
	},
	ml: {
		sm: 8,
		xs: 5,
	},
	mb: 2,
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

const title = {
	fontFamily: 'Fira sans, sans-serif',
	fontWeight: 'bold',
	fontSize: {
		sm: '1.3rem',
		xs: '1.1rem',
	},
	mt: {
		md: '7rem',
		sm: '6rem',
		xs: '5rem',
	},
	textAlign: 'center',
	mb: {
		sm: '2rem',
		xs: '1rem',
	},
}

const submitButtonAlt = {
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
	px: 2,
	// Specific Style
	fontSize: {
		sm: '1.25rem',
		xs: '1rem',
	},
}

function LocalSale() {
	const dispatch = useDispatch()
	const history = useHistory()

	// Global State
	const { items } = useSelector((state) => state.database)
	const { shoppingCart } = useSelector((state) => state.addInventory)

	// Local State
	const [saleView, setSaleView] = useState('')

	// Item that is being added to the cart global store
	const [cartItem, setCartItem] = useState({})

	const [quantity, setQuantity] = useState(1)

	const addToCart = () => {
		let editUnit = false
		if (shoppingCart.length) {
			shoppingCart.forEach((item, index) => {
				if (item._id === cartItem._id) {
					editUnit = true
					let newArr = [...shoppingCart]
					newArr[index] = {
						_id: cartItem._id,
						userId: cartItem.userId,
						name: cartItem.name,
						cost: cartItem.cost,
						units: parseInt(quantity),
					}
					dispatch(setShoppingCart(newArr))
					setSaleView('addition')
				}
			})
		} else {
			dispatch(
				setShoppingCart([
					{
						_id: cartItem._id,
						userId: cartItem.userId,
						name: cartItem.name,
						cost: cartItem.cost,
						units: parseInt(quantity),
					},
				])
			)
			setSaleView('addition')
		}

		// Only triggers if it's a new item
		if (!editUnit) {
			let newArr = [...shoppingCart]
			newArr.push({
				_id: cartItem._id,
				userId: cartItem.userId,
				name: cartItem.name,
				cost: cartItem.cost,
				units: parseInt(quantity),
			})
			dispatch(setShoppingCart(newArr))
			setSaleView('addition')
		}
	}

	switch (saleView) {
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
						<Box onClick={() => dispatch(setSalesPage(''))} sx={back}>
							Go Back
						</Box>
						{items.map((item) => (
							<Box
								sx={{
									...itemStyle,
									cursor: 'pointer',
									'&:hover': {
										backgroundColor: 'hsl(46, 98%, 55%)',
									},
								}}
								onClick={() => {
									setSaleView('cart')
									setCartItem(item)
								}}
							>
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
							</Box>
						))}
					</Box>
				</Container>
			)
		case 'cart':
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
						<Box onClick={() => setSaleView('')} sx={back}>
							Go Back
						</Box>
						<Box
							sx={{
								...itemStyle,
								flexDirection: 'column',
							}}
						>
							<Box>
								<Typography sx={itemTitle}>{cartItem.name}</Typography>
								<Box sx={itemMeta}>
									<Box>
										<Typography sx={itemMetaSpace}>
											Category: <span className='sub'>{cartItem.category}</span>
										</Typography>
									</Box>
									<Box>
										<Typography sx={{ ...itemMetaSpace, ...cost }}>
											Cost: <span className='sub'>${cartItem.cost}</span>
										</Typography>
									</Box>
									<Box>
										<Typography sx={itemMetaUnit}>
											Units: <span className='sub'>{cartItem.units}</span>
										</Typography>
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									mt: {
										sm: 8,
										xs: 4,
									},
									mx: 'auto',
								}}
							>
								<Typography
									sx={{
										textAlign: 'center',
										fontSize: {
											sm: '1.8rem',
											xs: '1.2rem',
										},
										fontFamily: 'Fira Sans, sans-serif',
										fontWeight: 400,
									}}
								>
									How many units are you
									<br />
									looking to sell?
								</Typography>
								<Box
									component='form'
									onSubmit={(e) => {
										e.preventDefault()
										addToCart()
									}}
									autoComplete='off'
									sx={{
										...form,
										mt: 6,
									}}
								>
									<TextField
										sx={textField}
										id='standard-basic'
										variant='standard'
										type='number'
										label='Units'
										value={quantity}
										inputProps={{
											min: 1,
											max: cartItem.units,
										}}
										onChange={(e) => setQuantity(e.target.value)}
									/>
									<Button type='submit' sx={submitButton}>
										Sell
									</Button>
								</Box>
							</Box>
						</Box>
					</Box>
				</Container>
			)
		case 'addition':
			return (
				<Container sx={{ ...panelPosition, ...panelHeight }}>
					<Box sx={panel}>
						<Typography sx={title}>
							{' '}
							Great, you've added this to your cart. Would you like to continue
							<br />
							shopping or go to cart?
						</Typography>
						<Box
							sx={{
								display: 'flex',
								width: '15rem',
								justifyContent: 'space-evenly',
								mt: '3rem',
							}}
						>
							<Button
								sx={submitButtonAlt}
								onClick={() => history.push('/cart')}
							>
								Cart
							</Button>
							<Button
								sx={submitButtonAlt}
								onClick={() => {
									setQuantity(1)
									setCartItem({})
									setSaleView('')
								}}
							>
								Shop
							</Button>
						</Box>
					</Box>
				</Container>
			)
	}
}

export default LocalSale
