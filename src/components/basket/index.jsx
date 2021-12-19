import { Drawer } from 'antd'
import React from 'react'
import BasketItem from './item'
import DrawerFooter from '../drawer-footer';
import useModal from '../../hooks/use-modal'

const Basket = () => {
    const [isVisible, handleClose] = useModal('/basket', '/');

    return (
        <Drawer 
        title="Basket" 
        placement="right" 
        visible={isVisible}
        onClose={handleClose}
        footer={<DrawerFooter />}
        >
            {new Array(5).fill(0).map((item, index) => (
                <BasketItem key={index} />
            ))}
        </Drawer>
    )
}

export default Basket
