import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const useModal = (currPath: string): [boolean, () => void] => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = React.useState(false)

    const handleClose = () => {
        navigate(-1)
    }

    React.useEffect(() => {
        setIsVisible(location.pathname === currPath)
    }, [location.pathname])

    return [isVisible, handleClose]
}

export default useModal
