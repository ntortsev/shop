import React from 'react'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import styled from 'styled-components'
import Meta from 'antd/lib/card/Meta'

const BasketItem = () => {
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
                avatar={<Avatar src='https://picsum.photos/1920/1080'/>}
                title="Product"
                description={
                <div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <Space>
                        <div>
                            <Text strong>price:</Text>
                            <Text keyboard>100$</Text>
                        </div>
                        <div>
                            <Text strong>count:</Text>
                            <Text keyboard>1</Text>
                        </div>
                    </Space>
                </div>}
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
