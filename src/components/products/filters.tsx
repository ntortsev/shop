import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import useWindowSize from '../../hooks/use-window-size';
import ProductsCategories from './categories';
import ProductsSort from './sort';

const ProductsFilters = () => {
  const [windowWidth] = useWindowSize();

  return (
    <Wrapper>
      <Row justify="space-between" gutter={[4, 16]}>
        <Col>
          <ProductsCategories />
        </Col>
        <Col span={windowWidth < 570 ? 24 : undefined}>
          <ProductsSort />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ProductsFilters;

const Wrapper = styled.div`
  padding-bottom: 30px;
`;
