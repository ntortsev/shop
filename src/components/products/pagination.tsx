import { Pagination, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useLocation } from 'react-router-dom'
import useFilters from '../../hooks/use-filters'
import useParams from '../../hooks/use-params'
import product from '../../store/product'

const ProductsPagination = () => {
    const products = product.currList
    const location = useLocation()
    const [activePage, setActivePage] = React.useState(1)
    const [page] = useParams(['page']) 
    const filter = useFilters()

    React.useEffect(() => {
        setActivePage(page.value ? +page.value : 1)
    }, [location])

    const handleChange = (e: number) => {
        filter(e === 1 ? undefined : e.toString(), 'page')
        window.scrollTo(0,0)
    }
    return (
        <Row justify='center'>
            {products.length > 12 && 
            <Pagination 
            current={activePage} 
            total={products.length} 
            onChange={handleChange}
            pageSize={12}
            />
            }
        </Row>
    )
}

export default observer(ProductsPagination)
