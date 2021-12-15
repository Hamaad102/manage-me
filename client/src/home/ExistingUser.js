import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// MUI
import { Box, Container } from '@mui/material'

// SVG
import editIcon from '../svg/editIcon.svg'
import refund from '../svg/refund.svg'

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
		xs: '11rem',
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

function ExistingUser() {
	// React Router change view
	const history = useHistory()

	const { newOrders } = useSelector((state) => state.database)

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
					justifyContent: 'space-evenly',
				}}
			>
				<Box sx={panel} onClick={() => history.push('/inventory')}>
					<img src={editIcon} className='icon' alt='edit icon' />
					Add or Edit Inventory
				</Box>
				<Box sx={panel} onClick={() => history.push('/sale')}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<span className='lato salesIcon'>
							{newOrders.length ? `(${newOrders.length})` : `(0)`}{' '}
						</span>
						<span className='lato salesText'>New Sales</span>
					</Box>
					Record Sales
				</Box>
				<Box sx={panel} onClick={() => history.push('/refund')}>
					<img src={refund} className='icon' alt='refund icon' />
					Refund a Sale
				</Box>
			</Box>
		</Container>
	)
}

export default ExistingUser
