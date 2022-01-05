import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DrawerFooter = () => {
    const { Title } = Typography;
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        if(location.pathname === '/basket') navigate('/payment')
        if(location.pathname === '/payment') console.log('hello')
    }

    return (
        <DrawerFooterWrap>
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
        </DrawerFooterWrap>
    )
}

export default DrawerFooter

const DrawerFooterWrap = styled.div`
    user-select: none;
`