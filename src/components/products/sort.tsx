import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import product from '../../store/product'

const ProductsSort = () => {
    const {activeSort, filterProducts, activeCategory, setActivePage} = product
    const { Option } = Select;
    
    const handleChange = (e: string) => {
        setActivePage(1)
        filterProducts(activeCategory, e)
    } 

    return (
        <Select 
        dropdownStyle={DropDownStyles} 
        style={SelectWidth} 
        value={activeSort} 
        size='large' 
        onChange={handleChange}
        >
            <Option value='none'>Sort by</Option>
            <Option value='desc'>Descending price</Option>
            <Option value='asc'>Ascending price</Option>
        </Select>
    )
}

export default observer(ProductsSort)

const SelectWidth: React.CSSProperties = {
    minWidth: '165px', 
    width: '100%'
}

const DropDownStyles: React.CSSProperties = {
    zIndex: 10
}