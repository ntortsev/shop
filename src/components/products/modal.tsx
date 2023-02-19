import { Button, Card, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import { observer } from 'mobx-react-lite';
import React from 'react'
import styled from 'styled-components';
import basket from '../../store/basket';
import product from '../../store/product';
import { ProductType } from '../../types/product';
import ProductsEmptyItem from './empty-item';

const ProductsModal = () => {
    const initialProduct: ProductType = {
        id: 0, price: 0, category: 'all', count: 0, image: '', title: '', description: ''
    }
    const id = product.openedProductId
    const [currProduct, setCurrProduct] = React.useState(initialProduct)
    const [isProductAdded, setIsProductAdded] = React.useState(false)

    const handleClose = () => {
        product.setIsProductOpened(false)
    }

    React.useEffect(() => {
        const foundProduct = product.initialList.find(item => item.id === id)
        setCurrProduct(foundProduct ?? product.initialList[0])
    }, [id, product.isLoading])

    React.useEffect(() => {
        const foundProductId = basket.list.findIndex(item => (
            item.id === id
        ))
        setIsProductAdded(
            foundProductId > -1 ? true : false
        )
    }, [basket.list.length, id])

    const handleClick = () => {
        if(!isProductAdded) basket.addToBasket(currProduct)
        else basket.removeFromBasket(currProduct.id)
    }

    const {Text} = Typography;

    return (
        <Modal 
        visible={product.isProductOpened}
        onCancel={handleClose}
        footer={null}
        width={1000}
        centered
        >
            {!product.isLoading 
            ?   (<ModalInner>
                <ImageWrap>
                    <Image src={currProduct?.image} alt='product'/>
                </ImageWrap>
                <Card 
                title={currProduct?.title} 
                style={CardStyles}
                bordered={false}
                >
                    <Text>
                        {currProduct?.description}
                    </Text>
                    <Button type='primary' 
                    block 
                    style={ButtonStyles} 
                    size='large' 
                    onClick={handleClick} 
                    danger={isProductAdded}
                    >
                        {isProductAdded ? 'Убрать из корзины' : 'Добавить в корзину'}
                    </Button>
                </Card>
            </ModalInner>)
            : <ProductsEmptyItem />
            }
        </Modal>
    )
}

export default observer(ProductsModal)

const ModalInner = styled.div`
    display: flex;
    padding: 15px;
    gap: 1rem;
    @media (max-width: 600px) {
        flex-wrap: wrap;
    }
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const ImageWrap = styled.div`
    max-height: 350px;
    max-width: 1000px;
    width: 100%;
    min-width: 250px;
`

const CardStyles: React.CSSProperties = {
    paddingBottom: '40px',
    maxWidth: '1000px',
    minWidth: '250px',
    width: '100%',
}

const ButtonStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
		background: '#ffcc11',
		borderColor: '#ffcc11'
}

