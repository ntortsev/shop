import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import ProductsCategories from './categories';
import ProductsSort from './sort';

const ProductsFilters = () => {

    return (
        <Wrapper>
            <Row justify='space-between'>
                <Col>
                    <ProductsCategories />
                </Col>
                <Col>
                    <ProductsSort />
                </Col>
            </Row>
        </Wrapper>
    )
}

export default ProductsFilters

const Wrapper = styled.div`
    padding-bottom: 30px;
`
