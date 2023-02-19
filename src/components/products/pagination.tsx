import { Pagination, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import product from '../../store/product';

type Props = {
  pageSize: number;
};

const ProductsPagination = ({ pageSize }: Props) => {
  const { activePage, setActivePage } = product;
  const products = product.currList;

  const handleChange = (e: number) => {
    setActivePage(e);
    window.scrollTo(0, 0);
  };
  return (
    <Row justify="center">
      {products.length > pageSize && (
        <Pagination
          current={activePage}
          total={products.length}
          onChange={handleChange}
          pageSize={pageSize}
        />
      )}
    </Row>
  );
};

export default observer(ProductsPagination);
