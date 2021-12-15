import { useSelector, useDispatch } from 'react-redux'

import { setSalesPage } from '../redux/navigationSlice'
import LocalSale from './LocalSale'
import OnlineSale from './OnlineSale'

// MUI
import { Box, Container } from '@mui/material'

// SVG
import coin from '../svg/coin.svg'
import lineGraph from '../svg/lineGraph.svg'

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

function Sale() {
	const dispatch = useDispatch()
	const { salesPage } = useSelector((state) => state.navigation)

	switch (salesPage) {
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
							onClick={() => dispatch(setSalesPage('sale'))}
						>
							<img src={coin} className='icon' alt='coin' />
							Enter a Sale
						</Box>
						<Box
							sx={panel}
							onClick={() => dispatch(setSalesPage('onlineSale'))}
						>
							<img src={lineGraph} className='icon' alt='line graph' />
							View Online Sales
						</Box>
					</Box>
				</Container>
			)
		case 'sale':
			return <LocalSale />
		case 'onlineSale':
			return <OnlineSale />
	}
}

export default Sale
