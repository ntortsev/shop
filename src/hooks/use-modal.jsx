import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const useModal = (currPath, closePath) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = React.useState(false)

    const handleClose = () => {
        navigate(closePath)
    }

    React.useEffect(() => {
        setIsVisible(location.pathname === currPath)
    }, [location.pathname])

    return [isVisible, handleClose]
}

export default useModal
