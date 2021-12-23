import React from 'react'
import styled from 'styled-components'
import ProductsFilters from './filters'
import ProductsList from './list'
import ProductsModal from './modal'
import ProductsPagination from './pagination'
import ProductsSearch from './search'

const Products = () => {
    return (
        <ProductsWrap>
            <ProductsSearch />
            <ProductsFilters />
            <ProductsList />
            <ProductsPagination />
            <ProductsModal />
        </ProductsWrap>
    )
}

export default Products

const ProductsWrap = styled.div`
    min-height: calc(100vh - 100px);
`