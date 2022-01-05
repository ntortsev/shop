import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useBlockUrls from './use-block-urls';

const useModal = (currPath: string): [boolean, () => void] => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = React.useState(false)
    const [prevLocation, setPrevLocation] = React.useState('/')
    const blockUrls = useBlockUrls()

    const handleClose = () => {
        navigate(prevLocation)
    }

    React.useEffect(() => {
        blockUrls(() => {
            setPrevLocation(location.pathname+location.search)
        }) 
        setIsVisible(location.pathname === currPath)
    }, [location])

    return [isVisible, handleClose]
}

export default useModal
