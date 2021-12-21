import { useNavigate } from 'react-router-dom'
import useParams from './use-params'

const useFilters = () => {
    const navigate = useNavigate()
    const [category, sort] = useParams(['category','sort'])

    const handleFilters = (value: string, type: string) => {
        const anotherValue = type === 'category' ? sort : category
        const defaultValue = type === 'category' ? 'all' : 'none'
        const anotherType = type === 'category' ? 'sort' : 'category'

        if(anotherValue){
            navigate(
                value === defaultValue 
                    ? `/products?${anotherType}=${anotherValue}` 
                    : `/products?${anotherType}=${anotherValue}&${type}=${value}`
            )
        }else{
            navigate(value === defaultValue ? '/' : `/products?${type}=${value}`)
        }
    }

    return handleFilters
}

export default useFilters