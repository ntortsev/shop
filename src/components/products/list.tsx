import { observer } from 'mobx-react-lite';
import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import useBlockUrls from '../../hooks/use-block-urls';
import useFilters from '../../hooks/use-filters';
import useParams from '../../hooks/use-params';
import product from '../../store/product';
import { ProductType } from '../../types/product';
import ProductsEmptyList from './empty-list';
import ProductsItem from './item';

const ProductsList = () => {
    const products = product.currList
    const filter = useFilters()
    const blockUrls = useBlockUrls()
    const location = useLocation()
    const pageSize = 12
    const [ page, search, category, sort ] = useParams(['page', 'search', 'category', 'sort'])
    const [showEnd, setShowEnd] = React.useState(pageSize)
    let showStart = showEnd - pageSize

    React.useEffect(() => {
        product.setProducts();
    }, [])

    React.useEffect(() => {
        if(products.length < showStart && product.isLoaded){
            filter(undefined, 'page')
        }
    }, [products])

    React.useEffect(() => {
        blockUrls(() => {
            setShowEnd(page.value ? pageSize * +page.value : pageSize)
            if(!sort.value && !category.value) product.searchProducts(search.value)
        })
    }, [location, product.isLoaded])

    return (
        <>
            {products.length
            ? <ProductsListWrap>
                {products
                    .slice(showStart, showEnd)
                    .map((product: ProductType) => (
                    <ProductsItem 
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    />
                ))}
            </ProductsListWrap>
            : <ProductsEmptyList />
            }
        </>
    )
}

export default observer(ProductsList)

export const ProductsListWrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding-bottom: 50px;
`

