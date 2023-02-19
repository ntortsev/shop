import { Radio } from 'antd';
import React from 'react';
import product from '../../store/product';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const ProductsCategories = () => {
  const { activeCategory, filterProducts, activeSort, setActivePage } = product;
  const radioGroup = React.useRef<HTMLHeadingElement>(null);
  const [radioGroupWidth, setRadioGroupWidth] = React.useState(0);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const radioBtn = e.target as HTMLInputElement;
    setActivePage(1);
    filterProducts(radioBtn.value, activeSort);
  };

  React.useEffect(() => {
    if (radioGroup.current) {
      setRadioGroupWidth(radioGroup.current.clientWidth);
    }
  }, [product.isLoading]);

  React.useEffect(() => {
    product.setCategories();
  }, [product.initialList]);

  return (
    <Radio.Group
      optionType="button"
      buttonStyle="solid"
      size="large"
      value={activeCategory}
      ref={radioGroup}>
      <RadioButton value="all" onClick={handleClick} radioGroupWidth={radioGroupWidth}>
        Все
      </RadioButton>
      {product.categories.map((category: string, index) => (
        <RadioButton
          key={index}
          value={category.replace(/[ ']/gi, '')}
          onClick={handleClick}
          radioGroupWidth={radioGroupWidth}>
          {category}
        </RadioButton>
      ))}
    </Radio.Group>
  );
};

export default observer(ProductsCategories);

const RadioButton = styled(Radio.Button)`
  ${(props: { radioGroupWidth: number }) =>
    `@media screen and (max-width: ${props.radioGroupWidth + 42}px){
            width: 100%;
            text-align: center;
        }`}
`;
