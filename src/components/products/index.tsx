import React from 'react'
import ProductsFilters from './filters'
import ProductsList from './list'
import ProductsModal from './modal'
import ProductsPagination from './pagination'
import ProductsSearch from './search'

const Products = () => {
    return (
        <div>
            <ProductsSearch />
            <ProductsFilters />
            <ProductsList />
            <ProductsPagination />
            <ProductsModal />
        </div>
    )
}

export default Products
