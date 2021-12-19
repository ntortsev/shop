import { Button, Card, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import styled from 'styled-components';
import useModal from '../../hooks/use-modal';

const ProductsModal = () => {
    const [isVisible, handleClose] = useModal('/product', '/');

    const {Text} = Typography;

    return (
        <Modal 
        visible={isVisible}
        onCancel={handleClose}
        footer={null}
        width={600}
        centered
        >
            <ModalInner>
                <div>
                    <Image src='https://picsum.photos/1920/1080' alt='product'/>
                </div>
                <Card 
                title="Product" 
                style={CardStyles}
                bordered={false}
                >
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio possimus fugiat culpa corrupti! 
                        Quo sapiente sit officiis atque quaerat mollitia, quis commodi laboriosam perspiciatis dignissimos?
                    </Text>
                    <Button type='primary' block style={ButtonStyles} size='large'>
                        Add to basket
                    </Button>
                </Card>
            </ModalInner>
        </Modal>
    )
}

export default ProductsModal

const ModalInner = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: minmax(250px, 1fr);
    gap: 1rem;
    padding: 15px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const CardStyles = {
    paddingBottom: '40px'
}

const ButtonStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0
}

