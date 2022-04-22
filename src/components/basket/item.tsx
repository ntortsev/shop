import React from 'react'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import styled from 'styled-components'
import Meta from 'antd/lib/card/Meta'
import { ProductType } from '../../types/product'
import basket from '../../store/basket'
import product from '../../store/product'
import { observer } from 'mobx-react-lite'

const BasketItem = ({id, title, image, price, count}: ProductType) => {
    const { Text } = Typography;
    const [initialPrice, setInitialPrice] = React.useState(0)

    const handleIncrement = () => {
        basket.changeCount(id, initialPrice, 'plus')
    }

    const handleDecrement = () => {
        basket.changeCount(id, initialPrice, 'minus')
    }

    const handleRemove = () => {
        basket.removeFromBasket(id)
    }

    React.useEffect(() => {
        const currProduct  = product.initialList.find(item => item.id === id)
        setInitialPrice(currProduct ? currProduct.price : 0)
    }, [product.isLoading])

    return (
        <Card
            style={CardStyles}
            actions={[
                <CloseOutlined onClick={handleRemove}/>,
                <MinusOutlined onClick={handleDecrement}/>,
                <PlusOutlined onClick={handleIncrement}/>
            ]}
            >
            <Meta
                avatar={<Avatar src={image}/>}
                title={title}
                description={
                    <Space wrap>
                        <div>
                            <Text strong>price:</Text>
                            <Text keyboard>{price}$</Text>
                        </div>
                        <div>
                            <Text strong>count:</Text>
                            <Text keyboard>{count}</Text>
                        </div>
                    </Space>
                }
            />
        </Card>
    )
}

export default observer(BasketItem)

const Avatar = styled.img`
    width: 75px;
    height: 75px;
    object-fit: cover;
    border-radius: 50%;
`

const CardStyles: React.CSSProperties = {
    userSelect: 'none'
}