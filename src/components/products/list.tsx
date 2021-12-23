import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import useParams from '../../hooks/use-params';
import product from '../../store/product';
import { ProductType } from '../../types/product';
import ProductsEmptyList from './empty-list';
import ProductsItem from './item';

const ProductsList = () => {
    const products = product.currList

    React.useEffect(() => {
        product.setProducts();
    }, [])

    return (
        <>
            {products.length
            ? <ProductsListWrap>
                {products.map((product: ProductType) => (
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

