import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

// Redux + Action for setting id
import { useDispatch } from 'react-redux'
import { setId, setRetrieve } from './redux/authSlice'
import {
	setInitialCategories,
	setInitialItems,
	setSales,
	setOnlineSales,
} from './redux/databaseSlice'

// Components
import Loading from './home/Loading'
import PostFetch from './home/PostFetch'

// Stylesheet
import './style/Style.css'

function App() {
	const dispatch = useDispatch()
	const { REACT_APP_DOMAIN } = process.env

	// Retrieve value of the id from the global store
	const { retrieve } = useSelector((state) => state.auth)

	useEffect(() => {
		axios
			.get(`${REACT_APP_DOMAIN}users/verify`, { withCredentials: true })
			.then((res) => {
				if (res.data) {
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

					// GET Request that takes multiple endpoints
					axios.all([requestCategories, requestItems, requestSales]).then(
						axios.spread((...response) => {
							if (response[0].data.length !== 0) {
								dispatch(setInitialCategories(response[0].data[0].category))
								dispatch(setInitialItems(response[1].data))
								dispatch(setSales(response[2].data))
								dispatch(
									setOnlineSales(
										response[2].data.filter((item) => item.online === true)
									)
								)
							}
							dispatch(setId(res.data))
							dispatch(setRetrieve(false))
						})
					)
				} else {
					dispatch(setRetrieve(false))
				}
			})
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [retrieve])

	// I don't want the webpage to render before I can check with the server whether the user is logged in or not
	// A loading screen is displayed first. Once the information is doing being retrieved the regular site is visible
	// If the user is logged in they have full access to the site and if they aren't logged in than only a small section of the site is accessbile
	return retrieve ? <Loading /> : <PostFetch />
}

export default App
