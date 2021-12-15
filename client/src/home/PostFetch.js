import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// React Router
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom'

import io from 'socket.io-client'

import { logout } from '../redux/authSlice'
import { setDefaultNavigation } from '../redux/navigationSlice'
import { setDefaultMetaData } from '../redux/inventorySlice'
import {
	setInitialItems,
	setInitialCategories,
	setSales,
	setOnlineSales,
	setNewOrders,
} from '../redux/databaseSlice'

// Components
import Home from './Home'
import Auth from '../auth/Auth'
import Inventory from '../inventory/Inventory'
import Refund from '../refund/Refund'
import Sale from '../sale/Sale'
import Cart from '../sale/Cart'

import { Box, Button, Container } from '@mui/material'

import logoText from '../svg/logoText.svg'

const navButton = {
	textTransform: 'none',
	fontSize: {
		sm: '2.188rem',
		xs: '1.4rem',
	},
	height: {
		sm: '3.6rem',
		xs: '2.6rem',
	},
	fontFamily: 'Lato, sans serif',
	color: '#000000',
	border: {
		sm: '0.25rem solid #000000',
		xs: '0.2rem solid #000000',
	},
	borderRadius: 0,
	p: '0.5rem',
	'&:hover': {
		color: '#F7BD02',
		backgroundColor: '#000000',
	},
}

function PostFetch() {
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// Global State
	const { id } = useSelector((state) => state.auth)
	const { shoppingCart } = useSelector((state) => state.addInventory)
	const { onlineSales } = useSelector((state) => state.database)

	// Local State
	const [location, setLocation] = useState(window.location.pathname)

	// Socket
	useEffect(() => {
		const socket = io(REACT_APP_DOMAIN, { withCredentials: true })

		// Update local store with updated items
		socket.on('updateItems', () => {
			axios
				.get(`${REACT_APP_DOMAIN}items/list`, { withCredentials: true })
				.then((res) => dispatch(setInitialItems(res.data)))
		})

		// Update local store with updated categories
		socket.on('updateCategories', () => {
			axios
				.get(`${REACT_APP_DOMAIN}items/categories`, { withCredentials: true })
				.then((res) => dispatch(setInitialCategories(res.data[0].category)))
		})

		socket.on('updateSales', () => {
			axios
				.get(`${REACT_APP_DOMAIN}sales`, { withCredentials: true })
				.then((res) => {
					dispatch(setSales(res.data))
					dispatch(
						setOnlineSales(res.data.filter((item) => item.online === true))
					)
				})
		})
	})

	useEffect(() => {
		let ordersCopy = []
		onlineSales.forEach((index) => {
			index.item.forEach((item) => {
				if (!item.fulfilled) ordersCopy.push(item)
			})
		})
		dispatch(setNewOrders(ordersCopy))
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onlineSales])

	return (
		<Router>
			<Container maxWidth='xl'>
				<Box
					sx={{
						mt: 3,
						display: 'flex',
						justifyContent:
							location === '/auth'
								? {
										sm: 'flex-start',
										xs: 'center',
								  }
								: 'flex-end',
					}}
				>
					{id ? (
						<>
							<Link
								to='/'
								onClick={() => {
									dispatch(setDefaultNavigation())
									dispatch(setDefaultMetaData())
								}}
							>
								<img src={logoText} className='navLogoAlt' alt='logo' />
							</Link>
							<Link className='right rightSpacer' to='/cart'>
								<svg
									className='cartButton'
									alt='shopping cart'
									data-name='Layer 1'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20.01 20'
								>
									<path
										d='M15.55,13a2,2,0,0,0,1.75-1l3.58-6.49A1,1,0,0,0,20,4H5.21L4.27,2H1V4H3l3.6,7.59L5.25,14A2,2,0,0,0,7,17H19V15H7l1.1-2ZM6.16,6H18.31l-2.76,5h-7ZM7,18a2,2,0,1,0,2,2A2,2,0,0,0,7,18Zm10,0a2,2,0,1,0,2,2A2,2,0,0,0,17,18Z'
										transform='translate(-1 -2)'
									/>
									<polygon
										id={shoppingCart.length ? 'full' : 'empty'}
										points='14.55 9 7.53 9 5.16 4 17.31 4 14.55 9'
									/>
								</svg>
							</Link>
							<Button
								sx={navButton}
								onClick={() =>
									axios
										.get(`${REACT_APP_DOMAIN}users/logout`, {
											withCredentials: true,
										})
										.then(() => dispatch(logout()))
								}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							{location === '/auth' ? (
								<Link
									to='/'
									onClick={() => {
										dispatch(setDefaultNavigation())
										setLocation('/')
									}}
								>
									<img src={logoText} className='navLogo' alt='logo' />
								</Link>
							) : (
								<Box
									sx={{
										display: {
											sm: 'block',
											xs: 'none',
										},
									}}
								>
									<Link
										to='/auth'
										style={{ textDecoration: 'none' }}
										onClick={() => setLocation('/auth')}
									>
										<Button sx={navButton}>Get Started</Button>
									</Link>
								</Box>
							)}
						</>
					)}
				</Box>
			</Container>

			<Switch>
				<Route path='/inventory'>
					{!id ? <Redirect to='/' /> : <Inventory />}
				</Route>
				<Route path='/sale'>{!id ? <Redirect to='/' /> : <Sale />}</Route>
				<Route path='/refund'>{!id ? <Redirect to='/' /> : <Refund />}</Route>
				<Route path='/auth'>{id ? <Redirect to='/' /> : <Auth />}</Route>
				<Route path='/cart'>{!id ? <Redirect to='/' /> : <Cart />}</Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
			<Box
				sx={{
					display: {
						sm: 'none',
						xs: !id && location === '/' ? 'flex' : 'none',
					},
					mt: '1rem',
					justifyContent: 'center',
				}}
			>
				<Link
					to='/auth'
					style={{ textDecoration: 'none' }}
					onClick={() => setLocation('/auth')}
				>
					<Button sx={navButton}>Get Started</Button>
				</Link>
			</Box>
		</Router>
	)
}

export default PostFetch
