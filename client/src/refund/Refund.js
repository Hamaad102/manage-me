import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

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
		sm: 4,
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

function Track() {
	const history = useHistory()
	const { REACT_APP_DOMAIN } = process.env

	// Global State
	const { sales } = useSelector((state) => state.database)

	// Local State
	const [displayFormat, setDisplayFormat] = useState()

	const refundItem = (obj) => {
		const { item, index } = obj
		let tempArr = [...sales[index].item]
		if (tempArr.length > 1) {
			tempArr = tempArr.filter((i) => i !== item)
			axios.post(
				`${REACT_APP_DOMAIN}sales/refund`,
				{ _id: obj._id, itemArr: tempArr, item },
				{ withCredentials: true }
			)
		} else {
			axios.post(
				`${REACT_APP_DOMAIN}sales/refund/delete`,
				{ _id: obj._id, itemArr: tempArr, item },
				{ withCredentials: true }
			)
		}
	}

	useEffect(() => {
		let tempArray = []
		sales.forEach((obj) =>
			obj.item.forEach((item) =>
				tempArray.push({
					_id: obj._id,
					index: sales.indexOf(obj),
					item: item,
					date: obj.date,
					online: obj.online,
				})
			)
		)
		setDisplayFormat(tempArray)
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sales])

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
				{displayFormat ? (
					displayFormat.length ? (
						<>
							<Box onClick={() => history.push('/')} sx={back}>
								Go Back
							</Box>
							{displayFormat.map((item) => (
								<Box sx={itemStyle}>
									<Box>
										<Typography sx={itemTitle}>{item.item.name}</Typography>
										<Box
											sx={{
												...itemMeta,
												display: {
													sm: 'flex',
													xs: 'none',
												},
											}}
										>
											<Box>
												<Typography sx={{ ...itemMetaSpace, ...cost, mr: 2 }}>
													Date: <span className='sub'>{item.date}</span>
												</Typography>
											</Box>
											<Box>
												<Typography
													sx={{
														...itemMetaSpace,
														...cost,
														width: '7rem',
													}}
												>
													Units: <span className='sub'>{item.item.units}</span>
												</Typography>
											</Box>
											<Box>
												<Typography sx={itemMetaUnit}>
													Order:{' '}
													<span className='sub'>
														{item.item.fulfilled ? 'Fulfilled' : 'Unfulfilled'}
													</span>
												</Typography>
											</Box>
										</Box>
									</Box>
									<Button
										type='submit'
										onClick={() => refundItem(item)}
										sx={{
											...submitButton,
											width: {
												sm: '8rem',
												xs: '6rem',
											},
											fontSize: {
												sm: '1.25rem',
												xs: '1rem',
											},
											ml: 0,
										}}
									>
										{item.item.fulfilled === true ? 'Refund' : 'Cancel'}
									</Button>
								</Box>
							))}
						</>
					) : (
						<>
							<Typography sx={itemTitle}>No new online sales</Typography>
							<Button
								type='submit'
								onClick={() => history.push('/')}
								sx={{
									...submitButton,
									ml: 0,
									width: 'auto',
								}}
							>
								Go Back
							</Button>
						</>
					)
				) : (
					<></>
				)}
			</Box>
		</Container>
	)
}

export default Track
