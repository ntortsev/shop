import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import product from '../../store/product';
import { ProductType } from '../../types/product';
import ProductsEmptyList from './empty-list';
import ProductsItem from './item';

type Props = {
  pageSize: number;
};

const ProductsList = ({ pageSize }: Props) => {
  const products = product.currList;
  const [showEnd, setShowEnd] = React.useState(pageSize);
  let showStart = showEnd - pageSize;

  React.useEffect(() => {
    product.fetchProducts();
  }, []);

  React.useEffect(() => {
    setShowEnd(pageSize * product.activePage);
  }, [product.activePage]);

  return (
    <>
      {products.length ? (
        <ProductsListWrap>
          {products.slice(showStart, showEnd).map((product: ProductType) => (
            <ProductsItem key={product.id} {...product} />
          ))}
        </ProductsListWrap>
      ) : (
        <ProductsEmptyList pageSize={pageSize} />
      )}
    </>
  );
};

export default observer(ProductsList);

export const ProductsListWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding-bottom: 50px;
`;
