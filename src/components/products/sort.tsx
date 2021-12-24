import { Select } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom';
import useFilters from '../../hooks/use-filters';
import useParams from '../../hooks/use-params';
import product from '../../store/product';

const ProductsSort = () => {
    const [activeOption, setActiveOption] = React.useState('none')
    const location = useLocation()
    const [category, sort] = useParams(['category','sort'])
    const { Option } = Select;
    const filters = useFilters()
    
    const handleChange = (e: any) => {
        const sort = e === 'none' ? undefined : e
        filters(sort, 'sort')
    } 

    React.useEffect(() => {
        const urls = ['/basket', '/product', '/payment']
        if(!urls.includes(location.pathname)){
            setActiveOption(sort.value ? sort.value : 'none')
        }
    }, [location])

    React.useEffect(() => {
        product.filterProducts(category.value, sort.value)
    }, [activeOption, product.isLoaded])

    return (
        <Select style={SelectWidth} value={activeOption} size='large' onChange={handleChange}>
            <Option value='none'>None</Option>
            <Option value='desc'>Descending price</Option>
            <Option value='asc'>Ascending price</Option>
        </Select>
    )
}

export default ProductsSort

const SelectWidth: React.CSSProperties = {
    minWidth: '165px'
}