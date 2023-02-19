import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import Container from './container';
import Basket from './basket';
import Payment from './payment';
import Products from './products';

const ContentWrap = () => {
  return (
    <Content style={ContentStyles}>
      <Container>
        <Products />
        <Basket />
        <Payment />
      </Container>
    </Content>
  );
};

export default ContentWrap;

const ContentStyles: React.CSSProperties = {
  padding: '50px 0px',
};
