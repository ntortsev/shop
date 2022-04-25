import { Select } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom';
import useBlockUrls from '../../hooks/use-block-urls';
import useFilters from '../../hooks/use-filters';
import useParams from '../../hooks/use-params';
import product from '../../store/product';

const ProductsSort = () => {
    const [activeOption, setActiveOption] = React.useState('none')
    const location = useLocation()
    const [category, sort, search] = useParams(['category','sort', 'search'])
    const blockUrls = useBlockUrls()
    const { Option } = Select;
    const filters = useFilters()
    
    const handleChange = (e: string) => {
        const sort = e === 'none' ? undefined : e
        filters(sort, 'sort')
    } 

    React.useEffect(() => {
        blockUrls(() => {
            setActiveOption(sort.value ? sort.value : 'none')
        })
    }, [location])

    React.useEffect(() => {
        blockUrls(() => {
            if(!search.value) product.filterProducts(category.value, sort.value)
        })
    }, [activeOption, product.isLoading])

    return (
        <Select 
        dropdownStyle={DropDownStyles} 
        style={SelectWidth} 
        value={activeOption} 
        size='large' 
        onChange={handleChange}
        >
            <Option value='none'>Sort by</Option>
            <Option value='desc'>Descending price</Option>
            <Option value='asc'>Ascending price</Option>
        </Select>
    )
}

export default ProductsSort

const SelectWidth: React.CSSProperties = {
    minWidth: '165px', 
    width: '100%'
}

const DropDownStyles: React.CSSProperties = {
    zIndex: 10
}