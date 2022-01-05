import { Button, Card, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useModal from '../../hooks/use-modal';
import useParams from '../../hooks/use-params';
import basket from '../../store/basket';
import product from '../../store/product';
import { ProductType } from '../../types/product';
import ProductsEmptyItem from './empty-item';

const ProductsModal = () => {
    const initialProduct: ProductType = {
        id: 0, price: 0, category: 'all', count: 0, image: '', title: '', description: ''
    }
    const [isVisible, handleClose] = useModal('/product');
    const [id] = useParams(['id'])
    const location = useLocation()
    const [currProduct, setCurrProduct] = React.useState(initialProduct)
    const [isProductAdded, setIsProductAdded] = React.useState(false)
    console.log(isProductAdded);

    React.useEffect(() => {
        const newProduct = product.initialList.find(item => id.value && item.id === +id.value)
        setCurrProduct(newProduct ? newProduct : initialProduct)
    }, [location, product.isLoaded])

    React.useEffect(() => {
        const foundProductId = basket.list.findIndex(item => (
            item.id === (id.value ? +id.value : 0)
        ))
        setIsProductAdded(
            foundProductId > -1 ? true : false
        )
    }, [basket.list.length, location])

    const handleClick = () => {
        if(!isProductAdded) basket.addToBasket(currProduct)
        if(isProductAdded) basket.removeFromBasket(currProduct.id)
    }

    const {Text} = Typography;

    return (
        <Modal 
        visible={isVisible}
        onCancel={handleClose}
        footer={null}
        width={1000}
        centered
        >
            {product.isLoaded 
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
                        {isProductAdded ? 'Remove' : 'Add to basket'}
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
    left: 0
}

