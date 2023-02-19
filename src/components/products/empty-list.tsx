import React from 'react';
import product from '../../store/product';
import styled from 'styled-components';
import { Empty } from 'antd';
import { ProductsListWrap } from './list';
import ProductsEmptyItem from './empty-item';
import { observer } from 'mobx-react-lite';
import { IoSearchOutline } from 'react-icons/io5';

type Props = {
  pageSize: number;
};

const ProductsEmptyList = ({ pageSize }: Props) => {
  return (
    <>
      {product.isLoading ? (
        <ProductsListWrap>
          {new Array(pageSize).fill(0).map((_, index) => (
            <ProductsEmptyItem key={index} />
          ))}
        </ProductsListWrap>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30vh',
          }}>
          <IoSearchOutline size={40} />
          <h1>Товар не найден</h1>
        </div>
      )}
    </>
  );
};

export default observer(ProductsEmptyList);

const EmptyWrap = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
