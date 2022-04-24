import { Drawer, Empty } from 'antd'
import React from 'react'
import BasketItem from './item'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal'
import basket from '../../store/basket';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import product from '../../store/product';
import { ProductType } from '../../types/product';

const Basket = () => {
    const [isVisible, handleClose] = useModal('/basket');
    const isBasketEmpty = basket.list.length === 0

    React.useEffect(() => {
        const storageBasketList = JSON.parse(localStorage.getItem('basketList') ?? '[]')

        const basketItems: ProductType[] = []
        storageBasketList.forEach((storageItem: {id: number, count: number}) => {
            const foundItem = product.initialList.find(item => item.id === storageItem.id)
            if(foundItem){
                basketItems.push({
                    ...foundItem, 
                    count: storageItem.count, 
                    price: +(foundItem.price * storageItem.count).toFixed(2)})
            }
        })
        
        basket.setList(basketItems)
    }, [product.initialList])

    return (
        <Drawer 
        title="Basket" 
        placement="right" 
        visible={isVisible}
        onClose={handleClose}
        footer={!isBasketEmpty && <DrawerFooter />}
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
