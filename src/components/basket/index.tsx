import { Drawer } from 'antd'
import React from 'react'
import BasketItem from './item'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal'
import basket from '../../store/basket';

const Basket = () => {
    const [isVisible, handleClose] = useModal('/basket');

    return (
        <Drawer 
        title="Basket" 
        placement="right" 
        visible={isVisible}
        onClose={handleClose}
        footer={<DrawerFooter />}
        style={DrawerStyles}
        >
            {basket.list.map((item) => (
                <BasketItem 
                key={item.id}
                {...item}
                />
            ))}
        </Drawer>
    )
}

export default Basket

const DrawerStyles: React.CSSProperties = {
    zIndex: 2000
}