import { useLocation } from 'react-router-dom'

const useBlockUrls = () => {
    const location = useLocation()
    const urls = ['/basket', '/product', '/payment']
    
    const newFunc = (func: () => void) => {
        if(!urls.includes(location.pathname)){
            func()
        }
    }
    return newFunc
}

export default useBlockUrls
