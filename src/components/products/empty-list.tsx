import React from 'react'
import product from '../store/product'
import styled from 'styled-components'
import { Empty } from 'antd'
import { ProductsListWrap } from './list'
import ProductsEmptyItem from './empty-item'
import { observer } from 'mobx-react-lite'

const ProductsEmptyList = () => {
    return (
        <>
            {product.isLoaded
                ? <EmptyWrap>
                    <Empty/>
                </EmptyWrap>
                : <ProductsListWrap>
                    {new Array(12).fill(0).map((_, index) => <ProductsEmptyItem key={index}/>)}
                </ProductsListWrap>
            }
        </>
    )
}

export default observer(ProductsEmptyList)

const EmptyWrap = styled.div`
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
`