import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setId } from '../redux/authSlice'
import {
	setInitialCategories,
	setInitialItems,
	setSales,
} from '../redux/databaseSlice'

// MUI
import { Box, Button, Container } from '@mui/material'

// SVG
import logo from '../svg/logoText.svg'
import blurb from '../svg/blurb.svg'

const containerHeight = {
	height: {
		md: '60vh',
		sm: '50vh',
		xs: '32vh',
	},
}

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
	px: '1rem',
	'&:hover': {
		color: '#F7BD02',
		backgroundColor: '#000000',
	},
}

function LandingPage() {
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// React Router change view
	const history = useHistory()

	// Handle Login request
	const login = (event) => {
		event.preventDefault()

		const email = 'demo@manageme.com'
		const password = 'manageme'

		axios
			.post(
				`${REACT_APP_DOMAIN}users/login`,
				{ email, password },
				{ withCredentials: true }
			)
			.then((res) => {
				dispatch(setId(res.data.user))

				// GET request endpoints
				const requestItems = axios.get(`${REACT_APP_DOMAIN}items/list`, {
					withCredentials: true,
				})
				const requestCategories = axios.get(
					`${REACT_APP_DOMAIN}items/categories`,
					{ withCredentials: true }
				)
				const requestSales = axios.get(`${REACT_APP_DOMAIN}sales`, {
					withCredentials: true,
				})

				axios.all([requestCategories, requestItems, requestSales]).then(
					axios.spread((...response) => {
						if (response[0].data.length !== 0) {
							dispatch(setInitialCategories(response[0].data[0].category))
							dispatch(setInitialItems(response[1].data))
							dispatch(setSales(response[2].data))
						}
						history.push('/')
					})
				)
			})
	}
	return (
		<Container sx={containerHeight}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: 'inherit',
					justifyContent: {
						sm: 'center',
						xs: 'flex-end',
					},
				}}
			>
				<img src={logo} className='headerLogo' alt='logo' />
				<img src={blurb} className='blurb' alt="life's hassles made easier" />
				<Button sx={navButton} onClick={login}>
					Demo
				</Button>
			</Box>
		</Container>
	)
}

export default LandingPage
