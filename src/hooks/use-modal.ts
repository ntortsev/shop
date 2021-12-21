import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const useModal = (currPath: string): [boolean, () => void] => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = React.useState(false)
    const [prevLocation, setPrevLocation] = React.useState('/')

    const handleClose = () => {
        navigate(prevLocation)
    }

    React.useEffect(() => {
        if(location.pathname !== currPath && location.pathname !== '/payment'){
            setPrevLocation(location.pathname+location.search)
        } 
        setIsVisible(location.pathname === currPath)
    }, [location])

    return [isVisible, handleClose]
}

export default useModal
