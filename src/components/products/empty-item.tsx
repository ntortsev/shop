import React from 'react'
import { Card, Spin } from 'antd'

const ProductsEmptyItem = () => {
    return (
        <Card style={EmptyCard}>
            <Spin size='large'/>
        </Card>
    )
}

export default ProductsEmptyItem

const EmptyCard: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px'
}
