import React from 'react'
import product from '../../store/product'
import styled from 'styled-components'
import { Empty } from 'antd'
import { ProductsListWrap } from './list'
import ProductsEmptyItem from './empty-item'
import { observer } from 'mobx-react-lite'

type Props = {
    pageSize: number
}

const ProductsEmptyList = ({pageSize}: Props) => {
    return (
        <>
            {product.isLoading
                ? <ProductsListWrap>
                    {new Array(pageSize).fill(0).map((_, index) => <ProductsEmptyItem key={index}/>)}
                </ProductsListWrap>
                : <EmptyWrap>
                    <Empty/>
                </EmptyWrap>
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