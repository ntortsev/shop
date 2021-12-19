import { Pagination, Row } from 'antd'
import React from 'react'

const ProductsPagination = () => {
    return (
        <Row justify='center'>
            <Pagination defaultCurrent={1} total={50}/>
        </Row>
    )
}

export default ProductsPagination
