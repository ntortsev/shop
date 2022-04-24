import { useLocation } from 'react-router-dom'

const useParams = (params: string[]) => {
    const location = useLocation()
    let result: ({name: string, value:string|undefined})[] = []
    
    params.forEach(param => {
        const regex = new RegExp(`${param}=([^&]+)`)
        const paramValue = location.search.match(regex)?.[1]
        result.push({name: param, value: decodeURI(paramValue ?? '')})
    })

    return result
}

export default useParams