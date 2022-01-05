import React from 'react'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import styled from 'styled-components'
import Meta from 'antd/lib/card/Meta'
import { ProductType } from '../../types/product'

const BasketItem = ({title, image, price, count}: ProductType) => {
    const { Text } = Typography;

    return (
        <Card
            actions={[
                <CloseOutlined />,
                <MinusOutlined />,
                <PlusOutlined />
            ]}
            >
            <Meta
                avatar={<Avatar src={image}/>}
                title={title}
                description={
                    <Space>
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

export default BasketItem

const Avatar = styled.img`
    width: 75px;
    height: 75px;
    object-fit: cover;
    border-radius: 50%;
`
