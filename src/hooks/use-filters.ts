import { useNavigate } from 'react-router-dom'
import useParams from './use-params'

const useFilters = () => {
    const navigate = useNavigate()
    let params = useParams(['category', 'sort', 'page', 'search'])

    const handleFilters = (value: string|undefined, name: string) => {
        let newUrl = ''
        if(name !== 'page') params = params.slice(0,3)

        const newParams = params.map(param => (
            param.name === name 
            ? {...param, value}
            : param.name === 'page' 
                ? {...param, value: undefined}
                : {...param}
        ))

        newParams.forEach((param) => {
            if(param.value){
                if(!newUrl){
                    newUrl += `/products?${param.name}=${param.value}`
                }else{
                    newUrl += `&${param.name}=${param.value}`
                }
            }
        })
        
        navigate(newUrl)
    }

    return handleFilters
}

export default useFilters