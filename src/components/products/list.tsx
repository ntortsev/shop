import { observer } from 'mobx-react-lite';
import React from 'react'
import styled from 'styled-components'
import product from '../store/product';
import ProductsEmptyList from './empty-list';
import ProductsItem from './item';

type Product = {
    id: number;
    image: string;
    title: string;
    price: number;
}

const ProductsList = () => {
    const products = product.list

    React.useEffect(() => {
        product.setProducts();
    }, [])

    return (
        <>
            {products.length
            ? <ProductsListWrap>
                {products.map((product: Product) => (
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

