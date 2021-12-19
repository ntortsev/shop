import { Input } from 'antd';
import React from 'react'

const ProductsSearch = () => {
    const { Search } = Input;

    return (
        <Search 
        style={SearchStyles}
        size='large'
        allowClear
        enterButton
        placeholder='Find product'
        />
    )
}

export default ProductsSearch

const SearchStyles: React.CSSProperties = {
    marginBottom: '20px',
    marginTop: '50px',
}
