import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { setSalesPage } from '../redux/navigationSlice'

// SVG
import check from '../svg/checkmark.svg'

// MUI
import { Box, Button, Container, Typography } from '@mui/material'

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
		xs: '100%',
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

function OnlineSale() {
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// Global State
	const { onlineSales, newOrders } = useSelector((state) => state.database)

	const orderFulfill = (item) => {
		let x, y
		onlineSales.forEach((arr, index) => {
			let innerIndex = arr.item.indexOf(item)
			if (innerIndex !== -1) {
				x = index
				y = innerIndex
			}
		})
		let modifiedSale = [...onlineSales[x].item]
		modifiedSale[y] = {
			itemId: modifiedSale[y].itemId,
			units: modifiedSale[y].units,
			name: modifiedSale[y].name,
			cost: modifiedSale[y].cost,
			fulfilled: true,
		}
		axios.post(
			`${REACT_APP_DOMAIN}sales/fulfill`,
			{ _id: onlineSales[x]._id, item: modifiedSale },
			{ withCredentials: true }
		)
	}

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
				{newOrders.length ? (
					<>
						<Box onClick={() => dispatch(setSalesPage(''))} sx={back}>
							Go Back
						</Box>
						{newOrders.map((item) => (
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
									<Box onClick={() => orderFulfill(item)} sx={cursor}>
										<img src={check} className='iconAlt' alt='checkmark' />
									</Box>
								</Box>
							</Box>
						))}
					</>
				) : (
					<>
						<Typography sx={itemTitle}>No new online sales</Typography>
						<Button
							type='submit'
							onClick={() => dispatch(setSalesPage(''))}
							sx={{
								...submitButton,
								ml: 0,
								width: 'auto',
							}}
						>
							Go Back
						</Button>
					</>
				)}
			</Box>
		</Container>
	)
}

export default OnlineSale
