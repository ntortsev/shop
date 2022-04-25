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

type Props = {
    pageSize: number
}

const ProductsList = ({pageSize}: Props) => {
    const products = product.currList
    const filter = useFilters()
    const blockUrls = useBlockUrls()
    const location = useLocation()
    const [ page, search, category, sort ] = useParams(['page', 'search', 'category', 'sort'])
    const [showEnd, setShowEnd] = React.useState(pageSize)
    let showStart = showEnd - pageSize

    React.useEffect(() => {
        product.fetchProducts();
    }, [])

    React.useEffect(() => {
        if(products.length < showStart && !product.isLoading){
            filter(undefined, 'page')
        }
    }, [products])

    React.useEffect(() => {
        blockUrls(() => {
            setShowEnd(page.value ? pageSize * +page.value : pageSize)
            if(!sort.value && !category.value) product.searchProducts(search.value)
        })
    }, [location, product.isLoading])

    return (
        <>
            {products.length
            ? <ProductsListWrap>
                {products
                    .slice(showStart, showEnd)
                    .map((product: ProductType) => (
                    <ProductsItem 
                    key={product.id}
                    {...product}
                    />
                ))}
            </ProductsListWrap>
            : <ProductsEmptyList pageSize={pageSize}/>
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

