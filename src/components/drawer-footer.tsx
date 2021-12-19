import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const DrawerFooter = () => {
    const { Title } = Typography;
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        if(location.pathname === '/basket') navigate('/payment')
        if(location.pathname === '/payment') console.log('hello')
    }

    return (
        <div>
            <Row justify='space-between'>
                <Col>
                    <Title level={3}>
                    Total price: 
                    </Title>
                </Col>
                <Col>
                    <Title level={3}>
                    1000$
                    </Title>
                </Col>
            </Row>
            <Button type='primary' onClick={handleClick} block size='large'>
                {location.pathname === '/basket' ? 'Go to payment' : 'To order'}
            </Button>
        </div>
    )
}

export default DrawerFooter
