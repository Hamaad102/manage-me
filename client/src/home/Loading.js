// MUI
import { Box, Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const containerHeight = {
	height: {
		md: '80vh',
		sm: '85vh',
		xs: '86vh',
	},
}

function Loading() {
	return (
		<Container maxWidth='xl' sx={containerHeight}>
			<Box
				sx={{
					width: 'inherit',
					height: 'inherit',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress
					sx={{
						color: 'black',
						width: '6rem!important',
						height: '6rem!important',
					}}
				/>
			</Box>
		</Container>
	)
}

export default Loading
