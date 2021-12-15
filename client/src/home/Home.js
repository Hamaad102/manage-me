// Redux function to retrieve value of id
import { useSelector } from 'react-redux'

// Components
import ExistingUser from './ExistingUser'
import LandingPage from './LandingPage'

function Home() {

    // Retrieve value of the id from the global store
    const { id } = useSelector(state => state.auth)

    return (
        <>
            { id ? <ExistingUser /> : <LandingPage />}
        </>
    )
}


export default Home