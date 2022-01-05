import { Drawer, Empty } from 'antd'
import React from 'react'
import BasketItem from './item'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal'
import basket from '../../store/basket';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const Basket = () => {
    const [isVisible, handleClose] = useModal('/basket');
    const isBasketEmpty = basket.list.length === 0

    return (
        <Drawer 
        title="Basket" 
        placement="right" 
        visible={isVisible}
        onClose={handleClose}
        footer={!isBasketEmpty && <DrawerFooter />}
        style={DrawerStyles}
        >
            {!isBasketEmpty ? 
            basket.list.map((item) => (
                <BasketItem 
                key={item.id}
                {...item}
                />
            ))
            : <EmptyWrap>
                <Empty />
            </EmptyWrap>
            }
        </Drawer>
    )
}

export default observer(Basket)

const EmptyWrap = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DrawerStyles: React.CSSProperties = {
    zIndex: 2000
}